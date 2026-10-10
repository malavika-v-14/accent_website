export default function WhatsAppButton() {
  const number = "919497419212";
  const message = encodeURIComponent("Hello Accent, I would like to know more.");
  return <a className="whatsapp-float" href={`https://wa.me/${number}?text=${message}`} target="_blank" rel="noreferrer" aria-label="Chat with Accent on WhatsApp">
    <svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 3a13 13 0 0 0-11.1 19.8L3 29l6.4-1.7A13 13 0 1 0 16 3Zm0 23.6a10.6 10.6 0 0 1-5.4-1.5l-.4-.2-3.8 1 1-3.7-.3-.4A10.6 10.6 0 1 1 16 26.6Zm5.8-7.9c-.3-.2-1.8-.9-2-.9s-.4-.1-.6.2-.7.9-.8 1.1-.3.2-.6.1a8.7 8.7 0 0 1-2.6-1.6 9.5 9.5 0 0 1-1.8-2.2c-.2-.3 0-.5.1-.6l.5-.5c.2-.2.2-.3.3-.5s0-.4 0-.5l-.9-2.1c-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.4 1 2.8 1.1 3 .2.3.3.5a12.4 12.4 0 0 0 4.8 4.2c.7.3 1.3.6 1.8.7.8.3 1.5.2 2 .1.6-.1 1.8-.7 2.1-1.4s.3-1.2.2-1.4-.3-.2-.6-.4Z" /></svg>
    <span>WhatsApp us</span>
  </a>;
}
