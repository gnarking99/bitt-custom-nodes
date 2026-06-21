import os
import folder_paths

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

NODE_CLASS_MAPPINGS = {
    "BittCloudSave": BittCloudSave
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "BittCloudSave": "Save & Send to Bitt Hub"
}
