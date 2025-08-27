interface JsonLdProps {
  children: object;
}

export function JsonLd({ children }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(children) }}
    />
  );
}
