export const UNKNOWN_ERROR_MESSAGE =
  "An unknown error occurred. Please try again later."

export const editorPlugin = {
  plugins:
    "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker markdown",
  toolbar:
    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
}

export const bands = [
  "All",
  "4.5 - 5.5",
  "5.5 - 6.5",
  "6.5 - 7.5",
  "7.5 - 8.5",
  "8.5+",
] as const
