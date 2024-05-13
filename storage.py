from azure.storage.blob import BlobServiceClient
import json

class SecureStorage:
    def __init__(self, connection_string, container_name, file_name):
        self.connection_string = connection_string
        self.container_name = container_name
        self.file_name = file_name

    def save_data(self, data):
        blob_service_client = BlobServiceClient.from_connection_string(self.connection_string)
        blob_client = blob_service_client.get_blob_client(container=self.container_name, blob=self.file_name)
        blob_client.upload_blob(json.dumps(data))

    def load_data(self):
        blob_service_client = BlobServiceClient.from_connection_string(self.connection_string)
        blob_client = blob_service_client.get_blob_client(container=self.container_name, blob=self.file_name)
        data = blob_client.download_blob().readall()
        return json.loads(data)
