const loginEmailTemplate = token => {
	return `<table class="container" border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
        <td align="center">
            <table class="content" border="0" cellpadding="0" cellspacing="0" width="600">
                <tr>
                    <td align="center" style="padding: 20px; background-color: #f3f3f3;">
                        <h2>One-Click Sign In</h2>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px; text-align: left;">
                        <p>Hello,</p>
                        <p>You are receiving this email because a sign in was initiated for your account. If this was not you, please disregard this email. No further action is required.</p>
                        <p>To sign in to your account, simply click the link below:</p>
                        <p style="text-align: center;">
                            <a href="http://localhost:3000/verify?token=${token}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 5px;">Sign In</a>
                        </p>
                        <p>If you're having trouble clicking the "Sign In" button, copy and paste the URL below into your web browser:</p>
                        
                        <p>Regards,<br>Your Team</p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>`;
};
export default loginEmailTemplate;
