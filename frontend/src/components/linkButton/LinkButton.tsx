interface LinkButtonProps {
    link: string;
    src:string;
    alt:string;
    styling?:string;
}

const LinkButton = ({link, src, alt, styling} : LinkButtonProps) => {
    return ( 
        <a
        // opens in new tab
        target="_blank"
        rel="noopener noreferrer"
        href={link}
        className="hover:scale-110 transition-all duration-300">
                <img
                src={src} 
                alt={alt}
                className={styling} />
        </a>
     );
}
 
export default LinkButton;