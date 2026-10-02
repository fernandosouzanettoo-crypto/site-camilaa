type Props = {
  nome: string;
  alt: string;
  sizes: string;
  className?: string;
  prioridade?: boolean;
  largura?: number;
  altura?: number;
};

/** Foto do kit em WebP (640 e 1280). Lazy em todas, exceto a do Hero. */
export function Picture({ nome, alt, sizes, className, prioridade = false, largura = 1280, altura = 1812 }: Props) {
  const src = `/images/${nome}`;
  return (
    <picture>
      <source type="image/webp" srcSet={`${src}-640.webp 640w, ${src}-1280.webp 1280w`} sizes={sizes} />
      <img
        src={`${src}-1280.webp`}
        alt={alt}
        width={largura}
        height={altura}
        className={className}
        loading={prioridade ? "eager" : "lazy"}
        decoding="async"
        // @ts-expect-error fetchpriority ainda não está nos tipos do React 18
        fetchpriority={prioridade ? "high" : undefined}
      />
    </picture>
  );
}
