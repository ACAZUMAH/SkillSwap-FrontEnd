import { supabase } from "src/services/supabase";

export const useUploadFile = () => {
  const uploadFile = async (file: File) => {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const upload = await supabase?.storage
        .from("chat-files")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (upload?.error) {
        throw new Error(`File upload failed: ${upload.error.message}`);
      }

      const uploadUrl = supabase?.storage
        .from("chat-files")
        .getPublicUrl(fileName);

      return uploadUrl?.data?.publicUrl;
    } catch (error) {
      console.error("File upload error:", error);
      throw new Error("Failed to upload file. Please try again.");
    }
  };

  const deleteFile = async (fileName: string) => {
    try {
      const deleted = await supabase?.storage
        .from("chat-files")
        .remove([fileName]);

      if (deleted?.error) {
        throw new Error(`File deletion failed: ${deleted.error.message}`);
      }
    } catch (error) {
      console.error("File deletion error:", error);
      throw new Error("Failed to delete file. Please try again.");
    }
  };

  const downloadFile = async (fileUrl: string) => {
    try {
      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error("Failed to download file.");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileUrl.split("/").pop() || "download";
      document.body.appendChild(a);
      a.click();
      a.remove();
      return response.ok;
    } catch (error) {
      console.error("File download error:", error);
      throw new Error("Failed to download file. Please try again.");
    }
  }

  return { uploadFile, downloadFile, deleteFile };
};
