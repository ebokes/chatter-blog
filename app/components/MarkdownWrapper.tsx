import ReactMarkdown from "react-markdown";

interface MarkdownProps {
  children: string;
}

const MarkdownWrapper: React.FC<MarkdownProps> = ({ children }) => {
  return (
    <ReactMarkdown
      components={{
        h1: ({ node, ...props }) => {
          return (
            <h1
              style={{
                marginTop: "1em",
                fontSize: "2em",
                fontWeight: "bolder",
              }}
              {...props}
            />
          );
        },
        h2: ({ node, ...props }) => {
          return (
            <h2
              style={{
                marginTop: "0.8em",
                fontSize: "1.5em",
                fontWeight: "bolder",
              }}
              {...props}
            />
          );
        },
        h3: ({ node, ...props }) => {
          return (
            <h3
              style={{
                marginTop: "0.6em",
                fontSize: "1.17em",
                fontWeight: "bolder",
              }}
              {...props}
            />
          );
        },
        h4: ({ node, ...props }) => {
          return (
            <h4
              style={{
                marginTop: "0.5em",
                fontSize: "1em",
                fontWeight: "bolder",
              }}
              {...props}
            />
          );
        },
        h5: ({ node, ...props }) => {
          return (
            <h5
              style={{
                marginTop: "0.5em",
                fontSize: "0.83em",
                fontWeight: "bolder",
              }}
              {...props}
            />
          );
        },
        h6: ({ node, ...props }) => {
          return (
            <h6
              style={{
                marginTop: "0.5em",
                fontSize: "0.67em",
                fontWeight: "bolder",
              }}
              {...props}
            />
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
};

export default MarkdownWrapper;
