import os
import folder_paths
import torch

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
                "r2_url_or_local_path": ("STRING", {"default": "", "multiline": True}),
            }
        }

    RETURN_TYPES = ("IMAGE", "VIDEO")
    FUNCTION = "load_media"
    CATEGORY = "Bitt Hub"

    def load_media(self, r2_url_or_local_path):
        # En el proxy_server interceptaremos este nodo para cargar desde R2 o local
        # Aquí retornamos dummy tensors para validación del grafo local si se ejecuta.
        dummy_image = torch.zeros((1, 512, 512, 3), dtype=torch.float32)
        dummy_video = torch.zeros((1, 16, 512, 512, 3), dtype=torch.float32)
        return (dummy_image, dummy_video)

NODE_CLASS_MAPPINGS = {
    "BittCloudSave": BittCloudSave,
    "BittCloudLoad": BittCloudLoad
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "BittCloudSave": "Save & Send to Bitt Hub",
    "BittCloudLoad": "Load from Bitt Hub (R2/Local)"
}
