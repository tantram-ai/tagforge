import React from "react";

type Props = {
  image?: string;
  title: string;
  description: string;
  url: string;
  site: "facebook" | "linkedin" | "twitter" | "google"; // for demo; extend if needed
  mobile?: boolean;
};

const logos: Record<string, string> = {
  facebook:
    "https://upload.wikimedia.org/wikipedia/commons/1/1b/Facebook_icon.svg",
  linkedin:
    "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
  twitter:
    "https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg"
};




export const SocialPreviewCard = ({
  image,
  title,
  description,
  url,
  site,
  mobile = true
}: Props) => {

  const commonContainerStyles = {
    maxWidth: mobile ? 380 : 550,
    border: "1px solid #e1e4e8",
    borderRadius: 12,
    fontFamily: "system-ui,sans-serif",
    overflow: "hidden",
    boxShadow: "0 1px 6px rgba(0,0,0,0.10)",
    margin: "0 auto",
    background: "#fff",
  };


  if (site === "google") {
    return (
      <div style={{ ...commonContainerStyles, padding: 16 }}>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none", color: "#1a0dab", fontSize: 17, fontWeight: 600 }}
        >
          {title}
        </a>
        <div
          style={{
            color: "#006621",
            fontSize: 14,
            margin: "4px 0",
          }}
        >
          {new URL(url).hostname}
        </div>
        <p style={{ color: "#545454", fontSize: 14, lineHeight: 1.4 }} dangerouslySetInnerHTML={{ __html: description }}>
        </p>
      </div>
    );
  }
  return (
    <div
      style={{ ...commonContainerStyles }}
    >
      {image && (
        <div
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: 180,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12
          }}
        />
      )}
      <div style={{ padding: 16 }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
          <img
            src={logos[site]}
            alt={site}
            style={{
              width: 28,
              height: 28,
              marginRight: 10,
              borderRadius: "50%",
              border: "1px solid #eee",
              background: "#f5f6fa"
            }}
          />
          <span style={{
            fontWeight: 700,
            textTransform: "capitalize",
            fontSize: 16,
            color: "#444"
          }}>{site}</span>
        </div>
        <div style={{
          fontWeight: 600, fontSize: 18, marginBottom: 8, color: "#222"
        }}>
          {title}
        </div>
        <div style={{ color: "#555", fontSize: 15, marginBottom: 12 }} dangerouslySetInnerHTML={{ __html: description }}>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#1da1f2",
            fontWeight: 500,
            fontSize: 15,
            textDecoration: "none",
            overflowWrap: "break-word"
          }}
        >
          {url}
        </a>
      </div>
    </div>
  )
};
