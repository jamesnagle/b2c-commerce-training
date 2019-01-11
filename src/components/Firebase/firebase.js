const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
    constructor(app) {
        app.initializeApp(config);

        /* Helper */

        this.emailAuthProvider = app.auth.EmailAuthProvider;

        /* Firebase APIs */

        this.auth = app.auth();
        this.db = app.firestore();

        const settings = { timestampsInSnapshots: true };
        this.db.settings(settings);
    }

    // *** Auth API ***

    doSignInWithEmailAndPassword = (email, password) => 
        this.auth.signInWithEmailAndPassword(email, password)

    doSignOut = () => this.auth.signOut();

    // *** Merge Auth and DB User API *** //

    onAuthUserListener = (next, fallback) =>
        this.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                next(authUser);
            } else {
                fallback();
            }
        });
}

let firebase;

function getFirebase(app, auth, database) {
    if (!firebase) {
        firebase = new Firebase(app, auth, database);
    }

    return firebase;
}

export default getFirebase;