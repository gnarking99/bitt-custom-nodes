import os
import folder_paths
from PIL import Image, ImageSequence, ImageOps
import torch
import numpy as np
import node_helpers

class BittCloudSave:
    def __init__(self):
        self.output_dir = folder_paths.get_output_directory()
        self.type = "output"

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "images": ("IMAGE", ),
                "project_name": (["Default"], ),
                "task_name": ("STRING", {"default": "Main Task"}),
            }
        }

    RETURN_TYPES = ()
    FUNCTION = "save_images"
    OUTPUT_NODE = True
    CATEGORY = "Bitt Hub"

    def save_images(self, images, project_name="Default"):
        return {"ui": {"images": []}}

class BittCloudLoad:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("STRING", {"default": ""})
            }
        }
    RETURN_TYPES = ("IMAGE", "MASK")
    FUNCTION = "load_image"
    CATEGORY = "Bitt Hub"

    def load_image(self, image):
        if not image:
            # Fallback a un tensor negro si no hay imagen (para evitar crasheos)
            return (torch.zeros((1, 64, 64, 3), dtype=torch.float32, device="cpu"), torch.zeros((64, 64), dtype=torch.float32, device="cpu"))
            
        image_path = folder_paths.get_annotated_filepath(image)
        if not os.path.exists(image_path):
            raise FileNotFoundError(f"Image not found at path: {image_path}")

        img = node_helpers.pillow(Image.open, image_path)
        
        output_images = []
        output_masks = []
        for i in ImageSequence.Iterator(img):
            i = node_helpers.pillow(ImageOps.exif_transpose, i)
            if i.mode == 'I':
                i = i.point(lambda i: i * (1 / 255))
            image = i.convert("RGB")
            image = np.array(image).astype(np.float32) / 255.0
            image = torch.from_numpy(image)[None,]
            if 'A' in i.getbands():
                mask = np.array(i.getchannel('A')).astype(np.float32) / 255.0
                mask = 1. - torch.from_numpy(mask)
            else:
                mask = torch.zeros((64,64), dtype=torch.float32, device="cpu")
            output_images.append(image)
            output_masks.append(mask.unsqueeze(0))

        if len(output_images) > 1:
            output_image = torch.cat(output_images, dim=0)
            output_mask = torch.cat(output_masks, dim=0)
        else:
            output_image = output_images[0]
            output_mask = output_masks[0]

        return (output_image, output_mask)

NODE_CLASS_MAPPINGS = {
    "BittCloudSave": BittCloudSave,
    "BittCloudLoad": BittCloudLoad
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "BittCloudSave": "Save & Send to Bitt Hub",
    "BittCloudLoad": "Load from Bitt Hub (R2/Local)"
}
