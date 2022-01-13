import emailjs from '@emailjs/browser';

const successMessage = document.querySelector('.message.success');
const errorMessage = document.querySelector('.message.error');

export default (formData) => {
    emailjs.send(process.env.SERVICE_ID, process.env.TEMPLATE_ID, formData, process.env.EMAILJS_USER_ID)
        .then((res) => {
            successMessage.textContent = "Votre message a bien été envoyé. Merci de m'avoir contacté."
        })
        .catch((err) => {
            errorMessage.textContent = "Une erreur s\'est produite. Veuillez réessayer."
        })
        .finally(() => {
            document.querySelector('.contact__form__button').style.display = "block";
            document.querySelector('.contact__form').reset();
        })
};