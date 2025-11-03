document.addEventListener('DOMContentLoaded', () => {

    // Print the joke about website's lack of responsiveness
    const subjectID = document.getElementById('msg-subject');
    const msgContent = document.getElementById('msg-content');

    const msgTemplate = `Hi Advertarium Team,

I’m writing to pass on my congratulations for the excellent work on the new website.

I am incredibly impressed with its responsive design. I've tested it across various screen sizes and devices, and the layout adapts beautifully. The fact that it works so great on every platform—from wide monitors down to small mobile screens—is a clear testament to your team's high-quality work and attention to detail.

This flawless cross-device compatibility is a huge win for our user experience. Thank you for all the hard work that went into this.`;

    subjectID.addEventListener('change', () => {
        const val = subjectID.value;
        if (val === "website_responsive") {
            console.log("SELECTED");
            msgContent.value = msgTemplate;
        } else {
            msgContent.value = "";
        }
    });
});