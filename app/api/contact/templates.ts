/**
 * Generates a notification template in HTML format.
 *
 * @param {string} name - The name of the person sending the message.
 * @param {string} email - The email address of the person sending the message.
 * @param {string} message - The content of the message.
 * @param {string} telephone - The telephone number of the person sending the message.
 *
 * @returns {string} - An HTML formatted string containing the notification template.
 */
export function generateNotificationTemplate(
	name: string,
	email: string,
	message: string,
	telephone: string,
): string {
	return `
        <!DOCTYPE html>
        <html>
        <head>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
            <style>
                body {
                    font-family: 'Montserrat', Arial, sans-serif;
                }
                .container {
                    width: 600px;
                    margin: auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                }
                .banner {
                    background-color: #fcc40c;
                    color: white;
                    padding: 10px;
                    text-align: center;
                    margin-bottom: 20px;
                }
                .leading {
                    margin-top: 0;
                    text-color: #191921;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="banner">
                    <h2>Nová správa od ${name}</h2>
                </div>
                <p class="leading">Antonín, máte novú správu od ${name}, z emailovej adresy: ${email} a telefónneho čísla${telephone}.</p>
                <p class="leading">Here's what they sent you:</p>
                <blockquote>${message}</blockquote>
                <p class="leading">cylinderpece.sk</p>
            </div>
        </body>
        </html>
    `;
}

/**
 * Generates a confirmation template in HTML format.
 *
 * @param {string} name - The name of the person sending the message.
 * @param {string} message - The content of the message.
 *
 * @returns {string} - An HTML formatted string containing the confirmation template.
 */
export function generateConfirmationTemplate(
	name: string,
	message: string,
): string {
	return `
        <!DOCTYPE html>
        <html>
        <head>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
            <style>
                body {
                    font-family: 'Montserrat', Arial, sans-serif;
                }
                .container {
                    width: 600px;
                    margin: auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                }
                .banner {
                    background-color: #fcc40c;
                    color: white;
                    padding: 10px;
                    text-align: center;
                    margin-bottom: 20px;
                }
                .social-media {
                    display: flex;
                    justify-content: center;
                    gap: 10px;
                    margin-top: 20px;
                    color: #fcc40c;
                }
                .social-media a {
                    text-decoration: none;
                    color: #333;
                    margin: 0 5px;
                }
                .leading {
                    margin-top: 0;
                    color: #191921;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="banner">
                    <h2>Ďakujeme za vašu správu, ${name}!</h2>
                </div>
                <p class="leading">Čoskoro vás budeme kontaktovať.</p>
                <p class="leading">Vaša správa:</p>
                <blockquote>${message}</blockquote>
                <p class="leading">Pekný zvýšok dňa,</p>
                <p class="leading">tím Cylinder Pece</p>
                <div class="social-media">
                    <a href="mailto:${process.env.NEXT_PUBLIC_EMAIL_USERNAME}">Email</a>|
                    <a href="https://www.cylinderpece.sk/">Web</a>
                </div>
            </div>
        </body>
        </html>
    `;
}
