import dropbox

ACCESS_TOKEN="Your_Access_Token"
dbx=dropbox.Dropbox(ACCESS_TOKEN)

def upload_file(local_path, dropbox_path):
    try:
        with open(local_path, "rb") as f:
            dbx.files_upload(f.read(), dropbox_path, mode=dropbox.files.WriteMode("overwrite"))
        print(f"File uploaded to {dropbox_path}")
    except Exception as e:
        print(f"Error uploading file: {e}")

def download_file(dropbox_path, local_path):
    try:
        metadata, res=dbx.files_download(dropbox_path)
        print(metadata)
        with open(local_path, "wb") as f:
            f.write(res.content)
        print(f"File downloaded to {local_path}")
    except Exception as e:
        print(f"Error downloading file: {e}")

def list_files(folder_path=""):
    try:
        files=dbx.files_list_folder(folder_path)
        print("Files in folder:")
        for file in files.entries:
            print(f"- {file.name}")
    except Exception as e:
        print(f"Error listing files: {e}")

if __name__ =="__main__":
    print("Dropbox File Manager")
    print("1. Upload a file")
    print("2. Download a file")
    print("3. List files in a folder")
    choice=input("Enter your choice (1/2/3): ")

    if choice=="1":
        local_path=input("Enter the local file path to upload: ")
        dropbox_path=input("Enter the Dropbox path to upload to (e.g., /filename.txt): ")
        upload_file(local_path, dropbox_path)
    elif choice =="2":
        dropbox_path=input("Enter the Dropbox file path to download (e.g., /filename.txt): ")
        local_path=input("Enter the local path to save the downloaded file: ")
        download_file(dropbox_path, local_path)
    elif choice =="3":
        folder_path=input("Enter the Dropbox folder path to list (leave empty for root): ")
        list_files(folder_path)
    else:
        print("Invalid choice. Exiting.")
