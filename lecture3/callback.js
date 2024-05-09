function study (subject, callback) {
    console.log(`I'm about to study ${subject}`);
    callback(subject);
}

function afterStudy(subject) {
    console.log(`I'm done studying ${subject}`);
}
study("CS546", afterStudy);
study("MongoDB", (subject) => {
    console.log(`I am done studying ${subject}, and I am tired`);
});