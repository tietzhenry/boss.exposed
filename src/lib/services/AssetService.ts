import { User } from "@prisma/client";
import prisma from "../prisma";
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { UploadType } from "../../../types";
import { InternalServerError } from "elysia";

const ROOT_DIR = process.cwd();
const STORAGE_PATHS = {
  root: path.join(ROOT_DIR, 'storage'),
  backgroundImage: path.join(ROOT_DIR, 'storage/backgroundImage'),
  backgroundVideo: path.join(ROOT_DIR, 'storage/backgroundVideo'),
  customCursor: path.join(ROOT_DIR, 'storage/customCursor'),
  audio: path.join(ROOT_DIR, 'storage/audio'),
  avatar: path.join(ROOT_DIR, 'storage/avatar')
};

Object.values(STORAGE_PATHS).forEach(folderPath => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
});

export class AssetService {
  private static async deleteFile(filePath: string): Promise<void> {
    if (filePath && fs.existsSync(filePath)) {
      try {
        await fs.promises.unlink(filePath);
        console.log(`Successfully deleted file: ${filePath}`);
      } catch (error) {
        console.error(`Failed to delete file at ${filePath}:`, error);
      }
    }
  }

  private static async cleanupOldAssets(assets: any, type: UploadType): Promise<void> {
    if (!assets) return;

    switch (type) {
      case UploadType.background:
        await this.deleteFile(assets.backgroundImagePath);
        await this.deleteFile(assets.backgroundVideoPath);
        break;
      case UploadType.audio:
        await this.deleteFile(assets.audioPath);
        break;
      case UploadType.profileAvatar:
        await this.deleteFile(assets.profileAvatarPath);
        break;
      case UploadType.customCursor:
        await this.deleteFile(assets.customCursorPath);
        break;
    }
  }

  static async retrieveAssets(user: User) {
    const customization = await prisma.customization.findFirst({
      where: { userId: user.id },
    });
    if (customization) {
      return prisma.assets.findFirst({
        where: { customization: customization },
      });
    }
  }

  static async deleteAsset(user: User, type: UploadType) {
    try {
      const customization = await prisma.customization.findFirst({
        where: { userId: user.id },
      });

      if (!customization) {
        throw new InternalServerError("Customization record not found for the user.");
      }

      const assets = await prisma.assets.findFirst({
        where: { id: customization.id },
      });

      if (!assets) {
        throw new InternalServerError("Assets record not found for the user.");
      }

      await this.cleanupOldAssets(assets, type);

      const updateData: Record<string, string> = {};
      
      switch (type) {
        case UploadType.background:
          updateData.backgroundImagePath = "";
          updateData.backgroundVideoPath = "";
          break;
        case UploadType.audio:
          updateData.audioPath = "";
          break;
        case UploadType.profileAvatar:
          updateData.profileAvatarPath = "";
          break;
        case UploadType.customCursor:
          updateData.customCursorPath = "";
          break;
        default:
          throw new InternalServerError("Invalid asset type.");
      }

      await prisma.assets.update({
        where: { id: customization.id },
        data: updateData
      });

      return { success: true, message: `Successfully deleted ${type} asset` };
    } catch (error) {
      console.error(`Error deleting asset of type ${type}:`, error);
      throw new InternalServerError("Failed to delete the asset.");
    }
  }

  static async uploadAsset(user: User, file: File, type: UploadType) {
    const customization = await prisma.customization.findFirst({
      where: { userId: user.id },
    });
  
    if (!customization) {
      throw new InternalServerError("Customization record not found for the user.");
    }
  
    const assets = await prisma.assets.findFirst({
      where: { id: customization.id },
    });
  
    let targetFilePath = "";
    const uniqueFilename = `${user.id}_${uuidv4()}${path.extname(file.name)}`;
    
    try {
      const fileBuffer = await file.arrayBuffer();
      
      await this.cleanupOldAssets(assets, type);
  
      if (type === UploadType.background) {
        if (file.type.startsWith("image/")) {
          targetFilePath = path.join(STORAGE_PATHS.backgroundImage, uniqueFilename);
          await fs.promises.writeFile(targetFilePath, Buffer.from(fileBuffer));
  
          await prisma.assets.update({
            where: { id: customization.id },
            data: { 
              backgroundImagePath: targetFilePath,
              backgroundVideoPath: "" 
            },
          });
        } else if (file.type.startsWith("video/")) {
          targetFilePath = path.join(STORAGE_PATHS.backgroundVideo, uniqueFilename);
          await fs.promises.writeFile(targetFilePath, Buffer.from(fileBuffer));
  
          await prisma.assets.update({
            where: { id: customization.id },
            data: { 
              backgroundVideoPath: targetFilePath,
              backgroundImagePath: "" 
            },
          });
        }
      } else if (type === UploadType.audio && file.type.startsWith("audio/")) {
        targetFilePath = path.join(STORAGE_PATHS.audio, uniqueFilename);
        await fs.promises.writeFile(targetFilePath, Buffer.from(fileBuffer));
  
        await prisma.assets.update({
          where: { id: customization.id },
          data: { audioPath: targetFilePath },
        });
      } else if (type === UploadType.profileAvatar && file.type.startsWith("image/")) {
        targetFilePath = path.join(STORAGE_PATHS.avatar, uniqueFilename);
        await fs.promises.writeFile(targetFilePath, Buffer.from(fileBuffer));
  
        await prisma.assets.update({
          where: { id: customization.id },
          data: { profileAvatarPath: targetFilePath },
        });
      } else if (type === UploadType.customCursor && file.type.startsWith("image/")) {
        targetFilePath = path.join(STORAGE_PATHS.customCursor, uniqueFilename);
        await fs.promises.writeFile(targetFilePath, Buffer.from(fileBuffer));
  
        await prisma.assets.update({
          where: { id: customization.id },
          data: { customCursorPath: targetFilePath },
        });
      } else {
        throw new InternalServerError("Unsupported file type for the selected upload type.");
      }
  
      return { success: true, filePath: targetFilePath };
    } catch (error) {
      console.error("Error during asset upload:", error);
      await this.deleteFile(targetFilePath); 
      throw new InternalServerError("Failed to upload the file.");
    }
  }
}