import { showNotification } from "@mantine/notifications";
import { supabase } from "src/services/supabase";

export const useUploadProfileImage = () => {
  const uploadProfileImage = async (file: File) => {
    if (!file) {
      showNotification({
        title: "Error",
        message: "No file image is provided.",
        color: "red",
      });
      return;
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `profile/${fileName}`;

    const { error } = await supabase.storage
      .from("profiles")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      showNotification({
        title: "Error",
        message: "Failed to upload profile image.",
        color: "red",
      });
      console.error("Upload error:", error);
      return;
    }

    const { data: publicData } = supabase.storage
      .from("profiles")
      .getPublicUrl(filePath);

    return publicData.publicUrl;
  };

  return { uploadProfileImage };
};
