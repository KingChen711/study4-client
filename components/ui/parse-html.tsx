import parse from "html-react-parser"

type Props = {
  data: string
}

function ParseHtml({ data }: Props) {
  return (
    <div className="markdown mt-[-21.5px] w-full min-w-full">{parse(data)}</div>
  )
}

export default ParseHtml
