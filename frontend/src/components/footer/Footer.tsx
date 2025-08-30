import LinkButton from "../linkButton/LinkButton";

const Footer = () => {
    return ( 
       <footer className="flex items-center justify-between mt-auto">
        
        <img src="/public/img/EE_logo.svg" alt="logo of education explorer" />

        <div className="flex items-center justify-center gap-2">
            <LinkButton
            link="https://github.com/KiBohr/MiniProject_Schools"
            src="/img/instagram.svg"
            alt="icon of instagram"
            styling="h-5"
            />

            <LinkButton
            link="https://www.linkedin.com/in/katharina-bohr-3380bb352/"
            src="/img/LinkedIn.svg"
            alt="icon of linkedin"
            styling="h-5"
            />
        </div>
       </footer>
     );
}
 
export default Footer;