import React, { useState } from "react";
import {
  Button,
  Modal,
  TextInput,
  SimpleGrid,
  Stack,
  Group,
  Textarea,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { FiEdit2, FiPlus, FiTrash } from "react-icons/fi";
import { z } from "zod";
import Image from "next/image";
import { createPost } from "@/app/_services/http/posts";

const postSchema = z.object({
  title: z.string().min(5, "O título deve ter pelo menos 5 caracteres"),
  description: z
    .string()
    .min(10, "A descrição deve ter pelo menos 10 caracteres"),
  image: z.string().url("URL inválida"),
  contentImages: z.array(z.string().url("URL inválida")).optional(),
});

type PostFormValues = z.infer<typeof postSchema>;

function CreatePostButton() {
  const [opened, setOpened] = useState(false);
  const [contentImages, setContentImages] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState("");

  const form = useForm<PostFormValues>({
    validate: zodResolver(postSchema),
    initialValues: {
      title: "",
      description: "",
      image: "",
      contentImages: [],
    },
  });

  const addContentImage = (url: string) => {
    setContentImages((prev) => [...prev, url]);
    form.setFieldValue("contentImages", [
      ...(form.values.contentImages as any),
      url,
    ]);
    setImageUrl(""); // Limpa o campo após adicionar a imagem
  };

  const removeContentImage = (url: string) => {
    const updatedImages = contentImages.filter((image) => image !== url);
    setContentImages(updatedImages);
    form.setFieldValue("contentImages", updatedImages);
  };

  const handleAddImage = () => {
    if (imageUrl && !contentImages.includes(imageUrl)) {
      addContentImage(imageUrl);
    }
  };

  // Função para gerar o slug automaticamente a partir do título
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, "-");
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString();
  };

  const handleSubmit = async (values: PostFormValues) => {
    const slug = generateSlug(values.title);
    const date = getCurrentDateTime();

    const postData = {
      ...values,
      slug,
      date,
      id: Date.now(),
    };

    try {
      const createdPost = await createPost(postData);
      console.log("Post criado:", createdPost);

      form.reset(); // Reseta os valores do formulário
      setContentImages([]); // Limpa as imagens de conteúdo
      setImageUrl(""); // Limpa o campo de URL da imagem

      // Fecha o modal
      setOpened(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button
        leftSection={<FiEdit2 size={16} />}
        className="bg-blue-500 text-white rounded-full h-10 px-5 hover:bg-blue-600"
        onClick={() => setOpened(true)}
      >
        Nova Postagem
      </Button>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Criar Nova Postagem"
        size="lg"
        classNames={{
          title: "text-white",
          body: "bg-gray-800",
          header: "bg-gray-800 ",
          content: "rounded-lg",
        }}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label="Título"
              placeholder="Título da Postagem"
              {...form.getInputProps("title")}
              classNames={{
                label: "text-white",
                input:
                  "p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500",
              }}
            />

            {/* Adicionando o campo de descrição */}
            <Textarea
              label="Descrição"
              placeholder="Descrição da Postagem"
              {...form.getInputProps("description")}
              classNames={{
                label: "text-white",
                input:
                  "p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500",
              }}
            />

            <TextInput
              label="URL da capa"
              placeholder="https://via.placeholder.com/150"
              {...form.getInputProps("image")}
              classNames={{
                label: "text-white",
                input:
                  "p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500",
              }}
            />

            <Stack className="w-full">
              <div className="flex items-center w-full">
                <TextInput
                  label="URL da Imagem de Conteúdo"
                  placeholder="https://via.placeholder.com/350"
                  value={imageUrl} // Use o estado controlado
                  onChange={(e) => setImageUrl(e.currentTarget.value)} // Atualiza o estado
                  className="w-full"
                  classNames={{
                    label: "text-white",
                    input:
                      "p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 w-full",
                  }}
                />
                <Button onClick={handleAddImage} className="ml-2 mt-[26px]">
                  <FiPlus size={16} />
                </Button>
              </div>

              <SimpleGrid cols={3}>
                {contentImages.map((url, index) => (
                  <div
                    key={index}
                    className="relative w-full h-32 overflow-hidden"
                  >
                    <Image
                      src={url}
                      alt={`Imagem de Conteúdo ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="absolute inset-0"
                    />
                    <Button
                      size="xs"
                      color="red"
                      className="absolute top-1 right-1 w-fit rounded-lg px-2"
                      onClick={() => removeContentImage(url)}
                    >
                      <FiTrash size={16} />
                    </Button>
                  </div>
                ))}
              </SimpleGrid>
            </Stack>

            <Group>
              <Button
                type="submit"
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                Enviar
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </>
  );
}

export default CreatePostButton;
