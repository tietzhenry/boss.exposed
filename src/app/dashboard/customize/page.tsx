"use client";
import { ContentLayout } from "@/components/dashboard/content-layout";
import { FileUpload } from "@/components/dashboard/asset-upload";
import { rpc } from "@/lib/rpc";
import { ImageIcon, Music, User, MousePointer } from "lucide-react";
import { AssetHook } from "@/components/hooks/assetupload-hook";
import { UploadType } from "../../../../types";

export default function Page() {
    const {assetQuery} = AssetHook()
    console.log(assetQuery.data)
    return (
        <ContentLayout title="Customize">
            <div className="h-screen w-full pt-5"> 
                <div className="bg-secondary p-6 rounded-lg w-full bg-cover"> 
                    <h1 className="font-extrabold text-2xl text-center mb-6">Assets</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full"> 
                        <div className="w-full"> 
                            <FileUpload 
                                logo={<ImageIcon className="w-8 h-8" />}
                                title="Background"
                                maxFileSize="JPG, PNG (MAX. 1920x1080px)"
                                type={UploadType.background}
                                previousFile={assetQuery.data?.backgroundImagePath}
                            />
                        </div>
                        <div className="w-full">
                            <FileUpload 
                                logo={<Music className="w-8 h-8" />}
                                title="Audio"
                                maxFileSize="MP3, WAV (MAX. 5MB)"
                                type={UploadType.audio}
                                previousFile={assetQuery.data?.audioPath}
                            />
                        </div>
                        <div className="w-full">
                            <FileUpload 
                                logo={<User className="w-8 h-8" />}
                                title="Profile Avatar"
                                maxFileSize="JPG, PNG (MAX. 400x400px)"
                                type={UploadType.profileAvatar}
                                previousFile={assetQuery.data?.profileAvatarPath}
                            />
                        </div>
                        <div className="w-full">
                            <FileUpload 
                                logo={<MousePointer className="w-8 h-8" />}
                                title="Custom Cursor"
                                maxFileSize="SVG, PNG (MAX. 100x100px)"
                                type={UploadType.customCursor}
                                previousFile={assetQuery.data?.customCursorPath}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </ContentLayout>
    );
}
