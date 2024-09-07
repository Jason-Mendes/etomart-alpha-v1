import os

def copy_project_to_txt(project_root, output_file):
  """
  Copies all code files from a project directory into a single .txt file.

  Args:
      project_root: The root directory of your project.
      output_file: The name of the output .txt file.
  """

  with open(output_file, 'w', encoding='utf-8') as outfile:
    for dirpath, dirnames, filenames in os.walk(project_root):
      for filename in filenames:
        if filename.endswith(('.js', '.jsx', '.css', '.html', '.json')):  # Adjust file extensions as needed
          filepath = os.path.join(dirpath, filename)
          with open(filepath, 'r', encoding='utf-8') as infile:
            outfile.write(f"### {filepath} ###\n")
            outfile.write(infile.read())
            outfile.write("\n\n")

if __name__ == "__main__":
  project_root = "path/to/your/project"  # Replace with the actual path to your project's root directory
  output_file = "project_code.txt"
  copy_project_to_txt(project_root, output_file)
  print(f"Project code copied to {output_file}")