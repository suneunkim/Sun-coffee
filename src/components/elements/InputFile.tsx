import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { storage } from "@/firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { TypeProduct } from "@/types/common";

interface Props {
  onChange: (vaule: string) => void;
  imageURL: string;
  data?: TypeProduct;
}

function InputFile({ onChange, imageURL, data }: Props) {
  const userProfile = useCurrentUser();
  const [isUploaded, setisUploaded] = useState(false); // 파일 선택 중복 금지

  useEffect(() => {
    imageURL ? setisUploaded(true) : setisUploaded(false);
  }, [imageURL]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await handleImageUpload(e.target.files[0]);
    }
  };

  const handleImageUpload = async (file: File) => {
    const webpImage = await convertToWebP(file); // 이미지 파일 webP로 변환
    const imageRef = ref(storage, `${userProfile?.uid}/${file.name}.webp`);
    await uploadString(imageRef, webpImage, "data_url");
    const downloadURL = await getDownloadURL(imageRef);
    onChange(downloadURL);
    setisUploaded(true);
  };

  const convertToWebP = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file); // 파일을 읽어서 Data URL 형식으로 변환
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string; // 이미지 소스로 설정
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0);
          resolve(canvas.toDataURL("image/webp", 0.8)); // webP 이미지로 변환
        };
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleCancleUpload = async () => {
    if (!imageURL) return;

    try {
      if (data?.imageURL.startsWith("https://firebasestorage.googleapis.com")) {
        const imageRef = ref(storage, imageURL);
        await deleteObject(imageRef);
      }
      onChange("");
      setisUploaded(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-end justify-between gap-2">
        <div className="w-full">
          <Label htmlFor="picture">Picture</Label>
          <Input
            disabled={isUploaded}
            onChange={handleFileSelect}
            id="picture"
            type="file"
          />
        </div>
        <Button type="button" onClick={handleCancleUpload}>
          취소
        </Button>
      </div>
      {imageURL && (
        <div className="flex justify-center ">
          <img className="w-[300px] rounded-lg" src={imageURL} />
        </div>
      )}
    </div>
  );
}
export default InputFile;
