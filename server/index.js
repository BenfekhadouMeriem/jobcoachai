import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState, useRef, useEffect } from "react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const questions = {
  beginner: [
    // HTML
    {
      id: "b_html_1",
      question: "Expliquez ce qu’est une balise HTML et donnez un exemple.",
      category: "Fondamentaux",
      level: "beginner",
      technology: "HTML",
      tips: "Donnez une définition claire et un exemple pratique (ex. <div>).",
      feedback: {
        good: "Excellente explication avec un exemple clair !",
        bad: "Ajoutez un exemple concret et expliquez le rôle de la balise."
      },
      evaluationCriteria: ["Clarté", "Exemple pratique", "Pertinence"]
    },
    {
      id: "b_html_2",
      question: "Qu’est-ce qu’un attribut HTML ? Donnez un exemple.",
      category: "Fondamentaux",
      level: "beginner",
      technology: "HTML",
      tips: "Mentionnez un attribut comme class ou id.",
      feedback: {
        good: "Bonne explication avec un exemple pertinent !",
        bad: "Précisez un attribut spécifique et son utilité."
      },
      evaluationCriteria: ["Définition", "Exemple", "Clarté"]
    },
    {
      id: "b_html_3",
      question: "Quelle est la différence entre une balise block et inline ?",
      category: "Mise en page",
      level: "beginner",
      technology: "HTML",
      tips: "Donnez des exemples comme <div> et <span>.",
      feedback: {
        good: "Excellente distinction avec des exemples clairs !",
        bad: "Ajoutez des exemples spécifiques pour chaque type."
      },
      evaluationCriteria: ["Distinction", "Exemples", "Clarté"]
    },
    {
      id: "b_html_4",
      question: "Pourquoi utilise-t-on la balise <meta> dans HTML ?",
      category: "Fondamentaux",
      level: "beginner",
      technology: "HTML",
      tips: "Parlez du rôle des métadonnées comme charset ou viewport.",
      feedback: {
        good: "Bonne explication du rôle des métadonnées !",
        bad: "Mentionnez un exemple concret comme charset."
      },
      evaluationCriteria: ["Rôle", "Exemple", "Pertinence"]
    },
    {
      id: "b_html_5",
      question: "Qu’est-ce que la sémantique en HTML ? Pourquoi est-elle importante ?",
      category: "Fondamentaux",
      level: "beginner",
      technology: "HTML",
      tips: "Mentionnez des balises comme <article> ou <section>.",
      feedback: {
        good: "Excellente explication de la sémantique !",
        bad: "Ajoutez des exemples de balises sémantiques."
      },
      evaluationCriteria: ["Définition", "Exemples", "Importance"]
    },
    // CSS
    {
      id: "b_css_1",
      question: "Qu’est-ce qu’une propriété CSS ? Donnez un exemple.",
      category: "Fondamentaux",
      level: "beginner",
      technology: "CSS",
      tips: "Mentionnez une propriété courante comme color ou margin.",
      feedback: {
        good: "Bonne définition avec un exemple pertinent !",
        bad: "Précisez une propriété spécifique et son impact visuel."
      },
      evaluationCriteria: ["Définition", "Exemple", "Clarté"]
    },
    {
      id: "b_css_2",
      question: "Comment appliquer un style CSS à un élément HTML ?",
      category: "Fondamentaux",
      level: "beginner",
      technology: "CSS",
      tips: "Parlez des méthodes comme inline, internal, et external CSS.",
      feedback: {
        good: "Bonne explication des méthodes d’application !",
        bad: "Mentionnez au moins deux méthodes différentes."
      },
      evaluationCriteria: ["Méthodes", "Exemple", "Clarté"]
    },
    {
      id: "b_css_3",
      question: "Qu’est-ce qu’un sélecteur CSS ? Donnez un exemple.",
      category: "Fondamentaux",
      level: "beginner",
      technology: "CSS",
      tips: "Mentionnez un sélecteur comme class ou id.",
      feedback: {
        good: "Excellente définition avec un exemple clair !",
        bad: "Ajoutez un exemple concret de sélecteur."
      },
      evaluationCriteria: ["Définition", "Exemple", "Pertinence"]
    },
    {
      id: "b_css_4",
      question: "Comment changer la couleur de fond d’un élément ?",
      category: "Style",
      level: "beginner",
      technology: "CSS",
      tips: "Utilisez la propriété background-color avec un exemple.",
      feedback: {
        good: "Bonne utilisation de background-color !",
        bad: "Précisez la syntaxe et un exemple."
      },
      evaluationCriteria: ["Syntaxe", "Exemple", "Clarté"]
    },
    {
      id: "b_css_5",
      question: "Quelle est la différence entre margin et padding ?",
      category: "Mise en page",
      level: "beginner",
      technology: "CSS",
      tips: "Expliquez avec un exemple visuel ou un schéma.",
      feedback: {
        good: "Excellente distinction avec un exemple clair !",
        bad: "Ajoutez un exemple pour illustrer la différence."
      },
      evaluationCriteria: ["Distinction", "Exemple", "Clarté"]
    },
    // JavaScript
    {
      id: "b_js_1",
      question: "Qu’est-ce qu’une variable en JavaScript ? Expliquez son rôle.",
      category: "Fondamentaux",
      level: "beginner",
      technology: "JavaScript",
      tips: "Expliquez var, let, const et donnez un exemple simple.",
      feedback: {
        good: "Excellente explication avec un exemple clair !",
        bad: "Mentionnez les différences entre var, let, const."
      },
      evaluationCriteria: ["Clarté", "Exemple", "Différences"]
    },
    {
      id: "b_js_2",
      question: "Qu’est-ce qu’une fonction en JavaScript ? Donnez un exemple.",
      category: "Fondamentaux",
      level: "beginner",
      technology: "JavaScript",
      tips: "Montrez une déclaration de fonction simple.",
      feedback: {
        good: "Bonne définition avec un exemple clair !",
        bad: "Ajoutez un exemple de fonction avec un cas d’utilisation."
      },
      evaluationCriteria: ["Définition", "Exemple", "Clarté"]
    },
    {
      id: "b_js_3",
      question: "Comment déclarer un tableau en JavaScript ?",
      category: "Fondamentaux",
      level: "beginner",
      technology: "JavaScript",
      tips: "Donnez un exemple avec des valeurs variées.",
      feedback: {
        good: "Bonne explication avec un exemple pertinent !",
        bad: "Ajoutez un exemple concret de déclaration."
      },
      evaluationCriteria: ["Syntaxe", "Exemple", "Clarté"]
    },
    {
      id: "b_js_4",
      question: "Qu’est-ce qu’un événement en JavaScript ? Donnez un exemple.",
      category: "Interactivité",
      level: "beginner",
      technology: "JavaScript",
      tips: "Mentionnez un événement comme click ou submit.",
      feedback: {
        good: "Excellente explication avec un exemple clair !",
        bad: "Précisez un type d’événement et son utilisation."
      },
      evaluationCriteria: ["Définition", "Exemple", "Pertinence"]
    },
    {
      id: "b_js_5",
      question: "Quelle est la différence entre == et === en JavaScript ?",
      category: "Fondamentaux",
      level: "beginner",
      technology: "JavaScript",
      tips: "Expliquez la conversion de type avec ==.",
      feedback: {
        good: "Bonne distinction avec des exemples clairs !",
        bad: "Ajoutez des exemples pour illustrer la différence."
      },
      evaluationCriteria: ["Distinction", "Exemple", "Clarté"]
    },
    // React
    {
      id: "b_react_1",
      question: "Pourquoi utilise-t-on React pour construire des interfaces utilisateur ?",
      category: "Fondamentaux",
      level: "beginner",
      technology: "React",
      tips: "Parlez du concept de composants et de la réactivité.",
      feedback: {
        good: "Bonne compréhension des principes de base de React !",
        bad: "Ajoutez des détails sur les composants ou le rendu."
      },
      evaluationCriteria: ["Clarté", "Exemple", "Pertinence"]
    },
    {
      id: "b_react_2",
      question: "Qu’est-ce qu’un composant React ? Donnez un exemple.",
      category: "Fondamentaux",
      level: "beginner",
      technology: "React",
      tips: "Montrez un composant fonctionnel simple.",
      feedback: {
        good: "Excellente définition avec un exemple clair !",
        bad: "Ajoutez un exemple de composant fonctionnel."
      },
      evaluationCriteria: ["Définition", "Exemple", "Clarté"]
    },
    {
      id: "b_react_3",
      question: "Qu’est-ce que JSX dans React ?",
      category: "Fondamentaux",
      level: "beginner",
      technology: "React",
      tips: "Expliquez la syntaxe et son rôle dans React.",
      feedback: {
        good: "Bonne explication de JSX avec un exemple !",
        bad: "Précisez la syntaxe JSX avec un exemple."
      },
      evaluationCriteria: ["Définition", "Exemple", "Clarté"]
    },
    {
      id: "b_react_4",
      question: "Comment ajouter un gestionnaire d’événements en React ?",
      category: "Interactivité",
      level: "beginner",
      technology: "React",
      tips: "Donnez un exemple avec onClick.",
      feedback: {
        good: "Bonne utilisation d’un gestionnaire d’événements !",
        bad: "Ajoutez un exemple concret avec onClick."
      },
      evaluationCriteria: ["Syntaxe", "Exemple", "Clarté"]
    },
    {
      id: "b_react_5",
      question: "Qu’est-ce que le rendu conditionnel en React ?",
      category: "Fondamentaux",
      level: "beginner",
      technology: "React",
      tips: "Montrez un exemple avec un opérateur ternaire ou &&.",
      feedback: {
        good: "Excellente explication du rendu conditionnel !",
        bad: "Ajoutez un exemple concret de condition."
      },
      evaluationCriteria: ["Définition", "Exemple", "Clarté"]
    },
    // General
    {
      id: "b_gen_1",
      question: "Comment priorisez-vous vos tâches dans un projet ?",
      category: "Soft Skills",
      level: "beginner",
      technology: "General",
      tips: "Mentionnez une méthode comme la matrice Eisenhower.",
      feedback: {
        good: "Excellente approche de priorisation avec un exemple clair !",
        bad: "Donnez un exemple concret de gestion des tâches."
      },
      evaluationCriteria: ["Méthode", "Exemple", "Clarté"]
    },
    {
      id: "b_gen_2",
      question: "Comment apprenez-vous une nouvelle technologie ?",
      category: "Soft Skills",
      level: "beginner",
      technology: "General",
      tips: "Parlez de ressources comme la documentation ou des tutoriels.",
      feedback: {
        good: "Bonne approche d’apprentissage avec des exemples !",
        bad: "Précisez les ressources ou méthodes utilisées."
      },
      evaluationCriteria: ["Méthode", "Exemple", "Clarté"]
    },
    {
      id: "b_gen_3",
      question: "Pourquoi voulez-vous travailler dans le développement web ?",
      category: "Motivation",
      level: "beginner",
      technology: "General",
      tips: "Reliez votre réponse à vos intérêts personnels.",
      feedback: {
        good: "Excellente motivation avec des raisons claires !",
        bad: "Personnalisez votre réponse avec des exemples."
      },
      evaluationCriteria: ["Motivation", "Personnalisation", "Clarté"]
    },
    {
      id: "b_gen_4",
      question: "Comment gérez-vous les retours sur votre travail ?",
      category: "Soft Skills",
      level: "beginner",
      technology: "General",
      tips: "Mentionnez l’importance de la critique constructive.",
      feedback: {
        good: "Bonne approche des retours avec un exemple !",
        bad: "Donnez un exemple concret de gestion de feedback."
      },
      evaluationCriteria: ["Approche", "Exemple", "Clarté"]
    },
    {
      id: "b_gen_5",
      question: "Qu’est-ce qui vous motive à coder ?",
      category: "Motivation",
      level: "beginner",
      technology: "General",
      tips: "Parlez d’un projet ou d’une réalisation personnelle.",
      feedback: {
        good: "Motivation claire avec un exemple inspirant !",
        bad: "Ajoutez un exemple concret de ce qui vous motive."
      },
      evaluationCriteria: ["Motivation", "Exemple", "Clarté"]
    }
  ],
  intermediate: [
    // HTML
    {
      id: "i_html_1",
      question: "Comment utiliser les balises sémantiques pour améliorer l’accessibilité ?",
      category: "Accessibilité",
      level: "intermediate",
      technology: "HTML",
      tips: "Mentionnez des balises comme <nav> ou <main> et leur impact.",
      feedback: {
        good: "Excellente utilisation des balises sémantiques !",
        bad: "Ajoutez des exemples spécifiques et leur impact sur l’accessibilité."
      },
      evaluationCriteria: ["Sémantique", "Accessibilité", "Exemple", "Clarté"]
    },
    {
      id: "i_html_2",
      question: "Comment structurer un formulaire HTML accessible ?",
      category: "Accessibilité",
      level: "intermediate",
      technology: "HTML",
      tips: "Parlez de <label>, aria-label, et validation.",
      feedback: {
        good: "Bonne structure avec des considérations d’accessibilité !",
        bad: "Précisez des attributs comme aria-label ou required."
      },
      evaluationCriteria: ["Structure", "Accessibilité", "Exemple", "Clarté"]
    },
    {
      id: "i_html_3",
      question: "Quelle est l’utilité de l’attribut data-* en HTML ?",
      category: "Fondamentaux",
      level: "intermediate",
      technology: "HTML",
      tips: "Donnez un exemple d’utilisation avec JavaScript.",
      feedback: {
        good: "Excellente explication avec un exemple clair !",
        bad: "Ajoutez un exemple concret d’utilisation."
      },
      evaluationCriteria: ["Définition", "Exemple", "Clarté"]
    },
    {
      id: "i_html_4",
      question: "Comment optimiser le chargement d’une page HTML ?",
      category: "Performance",
      level: "intermediate",
      technology: "HTML",
      tips: "Mentionnez async, defer, ou la minification.",
      feedback: {
        good: "Bonne explication des techniques d’optimisation !",
        bad: "Précisez des techniques comme async ou defer."
      },
      evaluationCriteria: ["Techniques", "Exemple", "Clarté"]
    },
    {
      id: "i_html_5",
      question: "Comment gérer les médias (images/vidéos) en HTML ?",
      category: "Médias",
      level: "intermediate",
      technology: "HTML",
      tips: "Parlez de <picture>, srcset, ou <video>.",
      feedback: {
        good: "Bonne gestion des médias avec des exemples !",
        bad: "Ajoutez des exemples comme srcset ou <video>."
      },
      evaluationCriteria: ["Médias", "Exemple", "Clarté"]
    },
    // CSS
    {
      id: "i_css_1",
      question: "Comment centrer un élément avec CSS ? Donnez plusieurs méthodes.",
      category: "Mise en page",
      level: "intermediate",
      technology: "CSS",
      tips: "Mentionnez Flexbox, Grid, et positionnement absolu.",
      feedback: {
        good: "Bonnes méthodes variées avec exemples clairs !",
        bad: "Ajoutez au moins deux méthodes différentes (ex. Flexbox, Grid)."
      },
      evaluationCriteria: ["Variété", "Exemples", "Clarté"]
    },
    {
      id: "i_css_2",
      question: "Expliquez le modèle de boîte CSS (box model).",
      category: "Fondamentaux",
      level: "intermediate",
      technology: "CSS",
      tips: "Mentionnez margin, padding, border, et content.",
      feedback: {
        good: "Excellente explication du box model !",
        bad: "Précisez les composants du box model."
      },
      evaluationCriteria: ["Définition", "Composants", "Clarté"]
    },
    {
      id: "i_css_3",
      question: "Comment créer une mise en page responsive avec CSS ?",
      category: "Mise en page",
      level: "intermediate",
      technology: "CSS",
      tips: "Parlez des media queries et des unités relatives.",
      feedback: {
        good: "Bonne approche responsive avec des exemples !",
        bad: "Ajoutez des exemples de media queries."
      },
      evaluationCriteria: ["Responsive", "Media queries", "Exemple", "Clarté"]
    },
    {
      id: "i_css_4",
      question: "Qu’est-ce que les pseudo-classes CSS ? Donnez un exemple.",
      category: "Fondamentaux",
      level: "intermediate",
      technology: "CSS",
      tips: "Mentionnez :hover ou :nth-child.",
      feedback: {
        good: "Bonne explication avec un exemple clair !",
        bad: "Ajoutez un exemple concret de pseudo-classe."
      },
      evaluationCriteria: ["Définition", "Exemple", "Clarté"]
    },
    {
      id: "i_css_5",
      question: "Comment utiliser les variables CSS ?",
      category: "Fondamentaux",
      level: "intermediate",
      technology: "CSS",
      tips: "Montrez un exemple avec --variable et var().",
      feedback: {
        good: "Excellente utilisation des variables CSS !",
        bad: "Ajoutez un exemple avec var()."
      },
      evaluationCriteria: ["Syntaxe", "Exemple", "Clarté"]
    },
    // JavaScript
    {
      id: "i_js_1",
      question: "Comment gérer les erreurs dans une requête API avec JavaScript ?",
      category: "Technique",
      level: "intermediate",
      technology: "JavaScript",
      tips: "Parlez d’async/await, try/catch, et gestion des codes HTTP.",
      feedback: {
        good: "Excellente structure avec une gestion robuste des erreurs !",
        bad: "Ajoutez des détails sur try/catch ou les codes d’erreur HTTP."
      },
      evaluationCriteria: ["Structure", "Gestion des erreurs", "Clarté", "Exemple"]
    },
    {
      id: "i_js_2",
      question: "Qu’est-ce que le DOM et comment le manipuler avec JavaScript ?",
      category: "Technique",
      level: "intermediate",
      technology: "JavaScript",
      tips: "Donnez un exemple avec querySelector ou getElementById.",
      feedback: {
        good: "Excellente explication du DOM avec un exemple pratique !",
        bad: "Ajoutez un exemple concret de manipulation du DOM."
      },
      evaluationCriteria: ["Définition", "Exemple", "Clarté"]
    },
    {
      id: "i_js_3",
      question: "Expliquez les fonctions fléchées en JavaScript.",
      category: "Fondamentaux",
      level: "intermediate",
      technology: "JavaScript",
      tips: 'Comparez avec les fonctions classiques et parlez de "this".',
      feedback: {
        good: "Bonne explication avec une comparaison claire !",
        bad: 'Ajoutez des détails sur le comportement de "this".'
      },
      evaluationCriteria: ["Définition", "Comparaison", "Clarté"]
    },
    {
      id: "i_js_4",
      question: "Comment utiliser les promesses en JavaScript ?",
      category: "Technique",
      level: "intermediate",
      technology: "JavaScript",
      tips: "Donnez un exemple avec .then() et .catch().",
      feedback: {
        good: "Excellente utilisation des promesses avec un exemple !",
        bad: "Ajoutez un exemple concret avec .then() ou .catch()."
      },
      evaluationCriteria: ["Syntaxe", "Exemple", "Clarté"]
    },
    {
      id: "i_js_5",
      question: "Qu’est-ce que la closure en JavaScript ? Donnez un exemple.",
      category: "Fondamentaux",
      level: "intermediate",
      technology: "JavaScript",
      tips: "Montrez une fonction imbriquée avec une variable persistante.",
      feedback: {
        good: "Excellente explication des closures !",
        bad: "Ajoutez un exemple concret de closure."
      },
      evaluationCriteria: ["Définition", "Exemple", "Clarté"]
    },
    // React
    {
      id: "i_react_1",
      question: 'Expliquez le concept de "props" dans React et leur utilisation.',
      category: "Fondamentaux",
      level: "intermediate",
      technology: "React",
      tips: "Donnez un exemple de passage de props entre composants.",
      feedback: {
        good: "Excellente explication avec un exemple clair !",
        bad: "Ajoutez un exemple concret de composant parent/enfant."
      },
      evaluationCriteria: ["Clarté", "Exemple pratique", "Pertinence", "Explication"]
    },
    {
      id: "i_react_2",
      question: "Comment gérer l’état dans un composant React ?",
      category: "Fondamentaux",
      level: "intermediate",
      technology: "React",
      tips: "Parlez du hook useState avec un exemple.",
      feedback: {
        good: "Bonne utilisation de useState avec un exemple !",
        bad: "Ajoutez un exemple concret avec useState."
      },
      evaluationCriteria: ["Syntaxe", "Exemple", "Clarté"]
    },
    {
      id: "i_react_3",
      question: "Qu’est-ce que le hook useEffect et quand l’utiliser ?",
      category: "Fondamentaux",
      level: "intermediate",
      technology: "React",
      tips: "Donnez un exemple pour une requête API ou un écouteur d’événement.",
      feedback: {
        good: "Excellente explication de useEffect !",
        bad: "Ajoutez un exemple concret d’utilisation."
      },
      evaluationCriteria: ["Définition", "Exemple", "Clarté"]
    },
    {
      id: "i_react_4",
      question: "Comment passer des données d’un composant enfant à un parent ?",
      category: "Interactivité",
      level: "intermediate",
      technology: "React",
      tips: "Parlez des callbacks passés via props.",
      feedback: {
        good: "Bonne explication avec un exemple clair !",
        bad: "Ajoutez un exemple de callback."
      },
      evaluationCriteria: ["Méthode", "Exemple", "Clarté"]
    },
    {
      id: "i_react_5",
      question: "Qu’est-ce que le rendu de liste en React ?",
      category: "Fondamentaux",
      level: "intermediate",
      technology: "React",
      tips: "Montrez un exemple avec map() et la prop key.",
      feedback: {
        good: "Excellente explication du rendu de liste !",
        bad: "Ajoutez un exemple avec map() et key."
      },
      evaluationCriteria: ["Syntaxe", "Exemple", "Clarté"]
    },
    // General
    {
      id: "i_gen_1",
      question: "Comment collaborez-vous avec une équipe sur un projet technique ?",
      category: "Collaboration",
      level: "intermediate",
      technology: "General",
      tips: "Mentionnez des outils comme Git, Jira, ou Slack.",
      feedback: {
        good: "Excellente description de la collaboration avec des outils concrets !",
        bad: "Précisez votre rôle et les outils utilisés."
      },
      evaluationCriteria: ["Outils", "Rôle", "Exemple", "Clarté"]
    },
    {
      id: "i_gen_2",
      question: "Comment gérez-vous un délai serré sur un projet ?",
      category: "Soft Skills",
      level: "intermediate",
      technology: "General",
      tips: "Utilisez un exemple concret avec une méthode de priorisation.",
      feedback: {
        good: "Bonne gestion des délais avec un exemple clair !",
        bad: "Ajoutez un exemple concret de gestion du temps."
      },
      evaluationCriteria: ["Méthode", "Exemple", "Clarté"]
    },
    {
      id: "i_gen_3",
      question: "Décrivez une situation où vous avez résolu un problème technique complexe.",
      category: "Résolution de problèmes",
      level: "intermediate",
      technology: "General",
      tips: "Utilisez la méthode STAR (Situation, Tâche, Action, Résultat).",
      feedback: {
        good: "Excellente utilisation de STAR avec un exemple clair !",
        bad: "Structurez mieux avec la méthode STAR."
      },
      evaluationCriteria: ["Méthode STAR", "Exemple", "Clarté"]
    },
    {
      id: "i_gen_4",
      question: "Comment expliquez-vous un concept technique à un non-technique ?",
      category: "Communication",
      level: "intermediate",
      technology: "General",
      tips: "Donnez un exemple avec une analogie simple.",
      feedback: {
        good: "Bonne explication avec une analogie claire !",
        bad: "Ajoutez une analogie ou un exemple concret."
      },
      evaluationCriteria: ["Clarté", "Analogie", "Exemple"]
    },
    {
      id: "i_gen_5",
      question: "Pourquoi devriez-vous être choisi pour ce poste ?",
      category: "Motivation",
      level: "intermediate",
      technology: "General",
      tips: "Reliez vos compétences aux besoins de l’entreprise.",
      feedback: {
        good: "Excellente personnalisation avec des compétences claires !",
        bad: "Personnalisez davantage avec des exemples spécifiques."
      },
      evaluationCriteria: ["Personnalisation", "Compétences", "Clarté"]
    }
  ],
  advanced: [
    // HTML
    {
      id: "a_html_1",
      question: "Comment optimiser le chargement d’une page HTML pour le SEO ?",
      category: "Performance",
      level: "advanced",
      technology: "HTML",
      tips: "Mentionnez les balises meta, SSR, et la minification.",
      feedback: {
        good: "Excellentes techniques pour le SEO !",
        bad: "Ajoutez des détails sur les meta tags ou SSR."
      },
      evaluationCriteria: ["Techniques", "SEO", "Exemple", "Clarté"]
    },
    {
      id: "a_html_2",
      question: "Comment implémenter un carrousel accessible en HTML ?",
      category: "Accessibilité",
      level: "advanced",
      technology: "HTML",
      tips: "Parlez d’ARIA roles et de la navigation clavier.",
      feedback: {
        good: "Bonne implémentation avec accessibilité !",
        bad: "Précisez les attributs ARIA ou la navigation clavier."
      },
      evaluationCriteria: ["Accessibilité", "ARIA", "Exemple", "Clarté"]
    },
    {
      id: "a_html_3",
      question: "Comment gérer les microdonnées pour améliorer le SEO ?",
      category: "SEO",
      level: "advanced",
      technology: "HTML",
      tips: "Mentionnez schema.org et un exemple comme JSON-LD.",
      feedback: {
        good: "Excellente utilisation des microdonnées !",
        bad: "Ajoutez un exemple concret comme JSON-LD."
      },
      evaluationCriteria: ["Microdonnées", "Exemple", "Clarté"]
    },
    {
      id: "a_html_4",
      question: "Comment gérer les formulaires complexes avec validation côté client ?",
      category: "Interactivité",
      level: "advanced",
      technology: "HTML",
      tips: "Parlez des attributs HTML5 comme pattern ou required.",
      feedback: {
        good: "Bonne gestion des formulaires complexes !",
        bad: "Précisez les attributs HTML5 utilisés."
      },
      evaluationCriteria: ["Validation", "Exemple", "Clarté"]
    },
    {
      id: "a_html_5",
      question: "Comment utiliser l’API Web Storage avec HTML ?",
      category: "Technique",
      level: "advanced",
      technology: "HTML",
      tips: "Donnez un exemple avec localStorage ou sessionStorage.",
      feedback: {
        good: "Excellente utilisation de Web Storage !",
        bad: "Ajoutez un exemple concret avec localStorage."
      },
      evaluationCriteria: ["API", "Exemple", "Clarté"]
    },
    // CSS
    {
      id: "a_css_1",
      question: "Expliquez les concepts de specificity et cascade en CSS.",
      category: "Fondamentaux",
      level: "advanced",
      technology: "CSS",
      tips: "Donnez un exemple où la spécificité affecte le style.",
      feedback: {
        good: "Excellente explication avec un exemple clair !",
        bad: "Ajoutez un exemple montrant un conflit de styles."
      },
      evaluationCriteria: ["Définition", "Exemple", "Clarté", "Conflit"]
    },
    {
      id: "a_css_2",
      question: "Comment optimiser les animations CSS pour la performance ?",
      category: "Performance",
      level: "advanced",
      technology: "CSS",
      tips: "Mentionnez transform, opacity, et will-change.",
      feedback: {
        good: "Excellentes techniques d’optimisation !",
        bad: "Précisez des propriétés comme transform ou will-change."
      },
      evaluationCriteria: ["Techniques", "Performance", "Exemple", "Clarté"]
    },
    {
      id: "a_css_3",
      question: "Comment créer un layout complexe avec CSS Grid ?",
      category: "Mise en page",
      level: "advanced",
      technology: "CSS",
      tips: "Donnez un exemple avec grid-template-areas.",
      feedback: {
        good: "Excellente utilisation de CSS Grid !",
        bad: "Ajoutez un exemple avec grid-template-areas."
      },
      evaluationCriteria: ["Syntaxe", "Exemple", "Clarté"]
    },
    {
      id: "a_css_4",
      question: "Comment gérer les thèmes (dark/light mode) avec CSS ?",
      category: "Style",
      level: "advanced",
      technology: "CSS",
      tips: "Parlez de prefers-color-scheme et des variables CSS.",
      feedback: {
        good: "Bonne gestion des thèmes avec des exemples !",
        bad: "Précisez l’utilisation de prefers-color-scheme."
      },
      evaluationCriteria: ["Thèmes", "Exemple", "Clarté"]
    },
    {
      id: "a_css_5",
      question: "Comment implémenter un design accessible avec CSS ?",
      category: "Accessibilité",
      level: "advanced",
      technology: "CSS",
      tips: "Mentionnez le contraste, la taille de police, et :focus.",
      feedback: {
        good: "Excellente approche d’accessibilité !",
        bad: "Ajoutez des détails sur le contraste ou :focus."
      },
      evaluationCriteria: ["Accessibilité", "Exemple", "Clarté"]
    },
    // JavaScript
    {
      id: "a_js_1",
      question: "Comment implémenteriez-vous un système de cache pour des requêtes API ?",
      category: "Performance",
      level: "advanced",
      technology: "JavaScript",
      tips: "Parlez de stratégies comme memoization ou localStorage.",
      feedback: {
        good: "Stratégie claire avec un exemple concret !",
        bad: "Ajoutez des détails sur l’implémentation et les limites."
      },
      evaluationCriteria: ["Stratégie", "Exemple", "Clarté", "Limites"]
    },
    {
      id: "a_js_2",
      question: "Expliquez le concept de hoisting en JavaScript.",
      category: "Fondamentaux",
      level: "advanced",
      technology: "JavaScript",
      tips: "Donnez un exemple avec var et une fonction.",
      feedback: {
        good: "Excellente explication du hoisting !",
        bad: "Ajoutez un exemple concret avec var ou function."
      },
      evaluationCriteria: ["Définition", "Exemple", "Clarté"]
    },
    {
      id: "a_js_3",
      question: "Comment optimiser les performances d’un script JavaScript ?",
      category: "Performance",
      level: "advanced",
      technology: "JavaScript",
      tips: "Mentionnez debouncing, throttling, ou Web Workers.",
      feedback: {
        good: "Excellentes techniques d’optimisation !",
        bad: "Précisez des techniques comme debouncing."
      },
      evaluationCriteria: ["Techniques", "Exemple", "Clarté"]
    },
    {
      id: "a_js_4",
      question: "Qu’est-ce que l’event loop en JavaScript ?",
      category: "Fondamentaux",
      level: "advanced",
      technology: "JavaScript",
      tips: "Expliquez la pile d’appels et la file d’attente.",
      feedback: {
        good: "Excellente explication de l’event loop !",
        bad: "Ajoutez des détails sur la pile et la file."
      },
      evaluationCriteria: ["Définition", "Exemple", "Clarté"]
    },
    {
      id: "a_js_5",
      question: "Comment implémenter une recherche asynchrone avec débouncing ?",
      category: "Interactivité",
      level: "advanced",
      technology: "JavaScript",
      tips: "Donnez un exemple avec setTimeout.",
      feedback: {
        good: "Bonne implémentation du débouncing !",
        bad: "Ajoutez un exemple concret avec setTimeout."
      },
      evaluationCriteria: ["Débouncing", "Exemple", "Clarté"]
    },
    // React
    {
      id: "a_react_1",
      question: "Comment optimiseriez-vous le rendu d’une application React ?",
      category: "Performance",
      level: "advanced",
      technology: "React",
      tips: "Mentionnez React.memo, useCallback, et lazy loading.",
      feedback: {
        good: "Techniques d’optimisation bien expliquées avec exemples !",
        bad: "Précisez des techniques comme React.memo ou lazy loading."
      },
      evaluationCriteria: ["Techniques", "Exemples", "Impact", "Clarté"]
    },
    {
      id: "a_react_2",
      question: "Comment gérer l’état global dans une application React ?",
      category: "Gestion d’état",
      level: "advanced",
      technology: "React",
      tips: "Parlez de Redux, Context API, ou Zustand.",
      feedback: {
        good: "Excellente gestion d’état global !",
        bad: "Ajoutez un exemple avec Context ou Redux."
      },
      evaluationCriteria: ["Méthode", "Exemple", "Clarté"]
    },
    {
      id: "a_react_3",
      question: "Comment implémenter le lazy loading de composants React ?",
      category: "Performance",
      level: "advanced",
      technology: "React",
      tips: "Utilisez React.lazy et Suspense avec un exemple.",
      feedback: {
        good: "Bonne implémentation du lazy loading !",
        bad: "Ajoutez un exemple avec React.lazy."
      },
      evaluationCriteria: ["Syntaxe", "Exemple", "Clarté"]
    },
    {
      id: "a_react_4",
      question: "Comment tester un composant React ?",
      category: "Test",
      level: "advanced",
      technology: "React",
      tips: "Mentionnez Jest et React Testing Library.",
      feedback: {
        good: "Excellente approche de test avec un exemple !",
        bad: "Précisez un outil comme Jest ou un exemple de test."
      },
      evaluationCriteria: ["Outils", "Exemple", "Clarté"]
    },
    {
      id: "a_react_5",
      question: "Comment gérer les erreurs dans une application React ?",
      category: "Technique",
      level: "advanced",
      technology: "React",
      tips: "Parlez des Error Boundaries ou try/catch dans useEffect.",
      feedback: {
        good: "Bonne gestion des erreurs avec un exemple !",
        bad: "Ajoutez un exemple avec Error Boundaries."
      },
      evaluationCriteria: ["Méthode", "Exemple", "Clarté"]
    },
    // General
    {
      id: "a_gen_1",
      question: "Comment résoudre un conflit dans une équipe technique ?",
      category: "Collaboration",
      level: "advanced",
      technology: "General",
      tips: "Utilisez la méthode STAR et mentionnez une situation réelle.",
      feedback: {
        good: "Excellente utilisation de la méthode STAR avec un exemple clair !",
        bad: "Structurez mieux avec la méthode STAR."
      },
      evaluationCriteria: ["Méthode STAR", "Exemple", "Résolution", "Clarté"]
    },
    {
      id: "a_gen_2",
      question: "Comment restez-vous à jour avec les nouvelles technologies ?",
      category: "Soft Skills",
      level: "advanced",
      technology: "General",
      tips: "Mentionnez des ressources comme blogs, conférences, ou GitHub.",
      feedback: {
        good: "Excellente stratégie d’apprentissage continu !",
        bad: "Précisez des ressources ou méthodes concrètes."
      },
      evaluationCriteria: ["Stratégie", "Exemple", "Clarté"]
    },
    {
      id: "a_gen_3",
      question: "Comment gérez-vous un projet avec des contraintes techniques fortes ?",
      category: "Résolution de problèmes",
      level: "advanced",
      technology: "General",
      tips: "Donnez un exemple avec des choix techniques justifiés.",
      feedback: {
        good: "Bonne gestion des contraintes avec un exemple !",
        bad: "Ajoutez un exemple concret de choix technique."
      },
      evaluationCriteria: ["Exemple", "Choix", "Clarté"]
    },
    {
      id: "a_gen_4",
      question: "Comment motivez-vous une équipe technique en difficulté ?",
      category: "Leadership",
      level: "advanced",
      technology: "General",
      tips: "Parlez de techniques comme la reconnaissance ou la transparence.",
      feedback: {
        good: "Excellente approche de leadership !",
        bad: "Ajoutez un exemple concret de motivation."
      },
      evaluationCriteria: ["Leadership", "Exemple", "Clarté"]
    },
    {
      id: "a_gen_5",
      question: "Comment évaluez-vous la faisabilité d’un projet technique ?",
      category: "Planification",
      level: "advanced",
      technology: "General",
      tips: "Mentionnez l’analyse des risques ou des ressources.",
      feedback: {
        good: "Bonne évaluation avec une méthodologie claire !",
        bad: "Précisez une méthode comme l’analyse des risques."
      },
      evaluationCriteria: ["Méthode", "Exemple", "Clarté"]
    }
  ]
};
const QuestionCard = ({
  question,
  index,
  total,
  autoSpeak,
  speakQuestion,
  isListening,
  toggleListening,
  currentAnswer,
  setCurrentAnswer,
  handleSend,
  handleSkip
}) => {
  return /* @__PURE__ */ jsxs("div", {
    className: "bg-white p-6 rounded-2xl shadow-md space-y-4",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "flex justify-between items-start",
      children: [/* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-xs font-semibold text-blue-700 uppercase tracking-wider",
          children: [question.category, " • ", question.level, " • ", question.technology, " • Question ", index + 1, "/", total]
        }), /* @__PURE__ */ jsx("div", {
          className: "mt-1 font-medium text-gray-800",
          children: question.question
        })]
      }), /* @__PURE__ */ jsx("button", {
        onClick: () => speakQuestion(index),
        className: "p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition",
        title: "Lire la question et les conseils",
        children: /* @__PURE__ */ jsx("span", {
          role: "img",
          "aria-hidden": "true",
          children: "🔊"
        })
      })]
    }), question.tips && /* @__PURE__ */ jsxs("div", {
      className: "p-3 bg-blue-50 rounded-lg text-sm text-blue-800",
      children: [/* @__PURE__ */ jsx("span", {
        className: "font-semibold",
        children: "💡 Conseil:"
      }), " ", question.tips]
    }), /* @__PURE__ */ jsxs("div", {
      className: "space-y-2",
      children: [/* @__PURE__ */ jsx("label", {
        htmlFor: "answer",
        className: "block text-sm font-medium text-gray-700",
        children: "Votre réponse:"
      }), /* @__PURE__ */ jsx("textarea", {
        id: "answer",
        className: "w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition",
        rows: 5,
        value: currentAnswer,
        onChange: (e) => setCurrentAnswer(e.target.value),
        placeholder: "Dites ou écrivez votre réponse ici..."
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex justify-between items-center text-xs text-gray-500",
        children: [/* @__PURE__ */ jsxs("div", {
          children: [currentAnswer.trim().split(/\s+/).filter((w) => w.length > 0).length, " mots"]
        }), /* @__PURE__ */ jsx("div", {
          children: "Minimum recommandé: 50 mots"
        })]
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "flex space-x-3",
      children: [/* @__PURE__ */ jsxs("button", {
        onClick: toggleListening,
        className: `flex items-center space-x-2 px-4 py-2 rounded-xl transition ${isListening ? "bg-red-600 text-white hover:bg-red-700" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`,
        children: [/* @__PURE__ */ jsx("span", {
          role: "img",
          "aria-hidden": "true",
          children: isListening ? "🛑" : "🎤"
        }), /* @__PURE__ */ jsx("span", {
          children: isListening ? "Arrêter" : "Réponse vocale"
        })]
      }), /* @__PURE__ */ jsx("button", {
        onClick: handleSkip,
        className: "px-4 py-2 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition",
        children: "Passer"
      }), /* @__PURE__ */ jsx("button", {
        onClick: handleSend,
        disabled: !currentAnswer.trim(),
        className: `flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl transition ${!currentAnswer.trim() ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`,
        children: index + 1 < total ? "Question suivante" : "Terminer"
      })]
    })]
  });
};
const ResultsCard = ({
  answers,
  totalScore,
  maxScore,
  percentage,
  interviewTime,
  formatTime,
  restartInterview,
  shareResults
}) => {
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-2xl text-white",
      children: [/* @__PURE__ */ jsx("h2", {
        className: "text-xl font-bold mb-2",
        children: "🎯 Résultats de votre entretien"
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex justify-between items-center",
        children: [/* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("div", {
            className: "text-sm opacity-80",
            children: "Score total"
          }), /* @__PURE__ */ jsxs("div", {
            className: "text-2xl font-bold",
            children: [totalScore, "/", maxScore]
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "relative w-16 h-16",
          children: /* @__PURE__ */ jsxs("svg", {
            className: "w-full h-full",
            viewBox: "0 0 36 36",
            children: [/* @__PURE__ */ jsx("path", {
              d: "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831",
              fill: "none",
              stroke: "#E5E7EB",
              strokeWidth: "3"
            }), /* @__PURE__ */ jsx("path", {
              d: "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "3",
              strokeDasharray: `${percentage}, 100`
            }), /* @__PURE__ */ jsxs("div", {
              className: "absolute inset-0 flex items-center justify-center text-sm font-bold",
              children: [percentage, "%"]
            })]
          })
        })]
      })]
    }), /* @__PURE__ */ jsx("div", {
      className: "space-y-4",
      children: answers.map((entry2, idx) => /* @__PURE__ */ jsxs("div", {
        className: "p-4 bg-gray-50 rounded-xl border",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex justify-between items-start",
          children: [/* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsxs("p", {
              className: "font-medium text-gray-900",
              children: [/* @__PURE__ */ jsxs("span", {
                className: "text-blue-600",
                children: ["Q", idx + 1, ":"]
              }), " ", entry2.question.question]
            }), /* @__PURE__ */ jsxs("p", {
              className: "text-xs text-gray-500",
              children: [entry2.question.category, " • ", entry2.question.level, " • ", entry2.question.technology]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: `px-2 py-1 rounded-full text-xs font-medium ${entry2.score >= 10 ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`,
            children: [entry2.score.toFixed(1), "/15"]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "mt-2 p-3 bg-white rounded-lg border",
          children: [/* @__PURE__ */ jsx("p", {
            className: "text-sm font-semibold text-gray-700",
            children: "Réponse:"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-gray-600",
            children: entry2.response
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: `mt-2 p-3 rounded-lg ${entry2.score >= 10 ? "bg-green-50 border border-green-100" : "bg-amber-50 border border-amber-100"}`,
          children: [/* @__PURE__ */ jsx("p", {
            className: "text-sm font-semibold",
            children: "Feedback:"
          }), /* @__PURE__ */ jsx("p", {
            className: entry2.score >= 10 ? "text-green-700" : "text-amber-700",
            children: entry2.feedback
          }), /* @__PURE__ */ jsxs("div", {
            className: "mt-2",
            children: [/* @__PURE__ */ jsx("p", {
              className: "text-xs font-semibold text-gray-500 mb-1",
              children: "Critères évalués:"
            }), /* @__PURE__ */ jsx("ul", {
              className: "grid grid-cols-2 gap-1 text-xs",
              children: entry2.question.evaluationCriteria.map((criterion, i) => /* @__PURE__ */ jsxs("li", {
                className: "flex items-center",
                children: [/* @__PURE__ */ jsx("span", {
                  className: "mr-1",
                  children: "•"
                }), criterion]
              }, i))
            })]
          })]
        })]
      }, entry2.question.id))
    }), /* @__PURE__ */ jsxs("div", {
      className: "grid grid-cols-2 gap-4",
      children: [/* @__PURE__ */ jsx("button", {
        onClick: restartInterview,
        className: "py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition",
        children: "Recommencer"
      }), /* @__PURE__ */ jsx("button", {
        onClick: shareResults,
        className: "py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition",
        children: "Partager"
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "p-4 bg-gray-50 rounded-xl border",
      children: [/* @__PURE__ */ jsx("h4", {
        className: "font-medium text-gray-800 mb-2",
        children: "📊 Analyse globale"
      }), /* @__PURE__ */ jsx("p", {
        className: "text-sm text-gray-600",
        children: percentage >= 80 ? "Excellent travail ! Vos réponses sont complètes et bien structurées." : percentage >= 60 ? "Bon travail ! Quelques améliorations possibles dans la structure." : "Continuez à vous entraîner avec des exemples concrets !"
      }), /* @__PURE__ */ jsxs("div", {
        className: "mt-3 grid grid-cols-2 gap-2 text-sm",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "p-2 bg-white rounded-lg border",
          children: [/* @__PURE__ */ jsx("div", {
            className: "text-xs text-gray-500",
            children: "Temps total"
          }), /* @__PURE__ */ jsx("div", {
            className: "font-medium",
            children: formatTime(interviewTime)
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "p-2 bg-white rounded-lg border",
          children: [/* @__PURE__ */ jsx("div", {
            className: "text-xs text-gray-500",
            children: "Moyenne/question"
          }), /* @__PURE__ */ jsxs("div", {
            className: "font-medium",
            children: [(totalScore / answers.length || 0).toFixed(1), "/15"]
          })]
        })]
      })]
    })]
  });
};
const Interview = () => {
  const [level, setLevel] = useState("beginner");
  const [technology, setTechnology] = useState("all");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [interviewTime, setInterviewTime] = useState(0);
  const recognitionRef = useRef(null);
  const timerRef = useRef(null);
  const isSpeakingRef = useRef(false);
  const filteredQuestions = questions[level].filter((q) => technology === "all" || q.technology === technology);
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setInterviewTime((prev) => prev + 1);
    }, 1e3);
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "fr-FR";
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setCurrentAnswer((prev) => prev ? `${prev} ${transcript}` : transcript);
      };
      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };
      recognition.onend = () => setIsListening(false);
      recognitionRef.current = recognition;
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, []);
  const speakQuestion = (index) => {
    if (window.speechSynthesis && !isSpeakingRef.current && index < filteredQuestions.length) {
      window.speechSynthesis.cancel();
      isSpeakingRef.current = true;
      const utterance = new SpeechSynthesisUtterance(filteredQuestions[index].question);
      utterance.lang = "fr-FR";
      utterance.rate = 0.9;
      utterance.onend = () => {
        if (filteredQuestions[index].tips) {
          const tipsUtterance = new SpeechSynthesisUtterance(`Conseil: ${filteredQuestions[index].tips}`);
          tipsUtterance.lang = "fr-FR";
          tipsUtterance.rate = 0.9;
          tipsUtterance.onend = () => {
            isSpeakingRef.current = false;
          };
          window.speechSynthesis.speak(tipsUtterance);
        } else {
          isSpeakingRef.current = false;
        }
      };
      window.speechSynthesis.speak(utterance);
    }
  };
  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error("Speech recognition error:", error);
        setIsListening(false);
      }
    }
  };
  const evaluateAnswer = (answer, question) => {
    const wordCount = answer.trim().split(/\s+/).length;
    const criteriaMatches = question.evaluationCriteria.filter((criterion) => answer.toLowerCase().includes(criterion.toLowerCase())).length;
    let score = Math.min(10, wordCount / 10) + criteriaMatches * 2;
    score = Math.min(score, 15);
    return {
      feedback: score >= 10 ? question.feedback.good : question.feedback.bad,
      score
    };
  };
  const handleSend = () => {
    if (!currentAnswer.trim()) return;
    const evaluation = evaluateAnswer(currentAnswer, filteredQuestions[step]);
    setAnswers([...answers, {
      question: filteredQuestions[step],
      response: currentAnswer,
      feedback: evaluation.feedback,
      score: evaluation.score
    }]);
    setCurrentAnswer("");
    if (step + 1 < filteredQuestions.length) {
      setStep(step + 1);
      if (autoSpeak) {
        setTimeout(() => speakQuestion(step + 1), 500);
      }
    } else {
      setShowResult(true);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };
  const handleSkip = () => {
    if (step + 1 < filteredQuestions.length) {
      setStep(step + 1);
      setCurrentAnswer("");
      if (autoSpeak) {
        setTimeout(() => speakQuestion(step + 1), 500);
      }
    } else {
      setShowResult(true);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };
  const restartInterview = () => {
    setStep(0);
    setAnswers([]);
    setShowResult(false);
    setCurrentAnswer("");
    setInterviewTime(0);
    timerRef.current = setInterval(() => {
      setInterviewTime((prev) => prev + 1);
    }, 1e3);
  };
  const shareResults = () => {
    const shareText = `J'ai obtenu ${percentage}% à mon entretien simulé avec JobCoachAI! 🎉

${answers.map((a, i) => `Q${i + 1}: ${a.score.toFixed(1)}/15`).join("\n")}`;
    if (navigator.share) {
      navigator.share({
        title: "Mes résultats JobCoachAI",
        text: shareText,
        url: window.location.href
      }).catch(console.error);
    } else {
      alert(shareText);
    }
  };
  const totalScore = answers.reduce((sum, answer) => sum + answer.score, 0);
  const maxScore = filteredQuestions.length * 15;
  const percentage = Math.round(totalScore / maxScore * 100);
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen bg-gray-100 p-4 flex items-center justify-center",
    children: /* @__PURE__ */ jsxs("div", {
      className: "max-w-3xl w-full space-y-4",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "flex justify-between items-center",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-2xl font-bold text-gray-800",
          children: "🎙️ JobCoachAI"
        }), /* @__PURE__ */ jsx("div", {
          className: "bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm",
          children: formatTime(interviewTime)
        })]
      }), !showResult && /* @__PURE__ */ jsxs("div", {
        className: "bg-white p-4 rounded-2xl shadow-md",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex flex-wrap gap-4 mb-4",
          children: [/* @__PURE__ */ jsxs("select", {
            value: level,
            onChange: (e) => setLevel(e.target.value),
            className: "px-3 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
            children: [/* @__PURE__ */ jsx("option", {
              value: "beginner",
              children: "Débutant"
            }), /* @__PURE__ */ jsx("option", {
              value: "intermediate",
              children: "Intermédiaire"
            }), /* @__PURE__ */ jsx("option", {
              value: "advanced",
              children: "Avancé"
            })]
          }), /* @__PURE__ */ jsxs("select", {
            value: technology,
            onChange: (e) => setTechnology(e.target.value),
            className: "px-3 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
            children: [/* @__PURE__ */ jsx("option", {
              value: "all",
              children: "Toutes technologies"
            }), [...new Set(questions[level].map((q) => q.technology))].map((tech) => /* @__PURE__ */ jsx("option", {
              value: tech,
              children: tech
            }, tech))]
          }), /* @__PURE__ */ jsxs("label", {
            className: "flex items-center space-x-2",
            children: [/* @__PURE__ */ jsx("input", {
              type: "checkbox",
              checked: autoSpeak,
              onChange: (e) => setAutoSpeak(e.target.checked),
              className: "h-4 w-4 text-blue-600"
            }), /* @__PURE__ */ jsx("span", {
              className: "text-sm text-gray-700",
              children: "Lecture auto"
            })]
          })]
        }), /* @__PURE__ */ jsx(QuestionCard, {
          question: filteredQuestions[step],
          index: step,
          total: filteredQuestions.length,
          autoSpeak,
          speakQuestion,
          isListening,
          toggleListening,
          currentAnswer,
          setCurrentAnswer,
          handleSend,
          handleSkip
        }), /* @__PURE__ */ jsxs("div", {
          className: "mt-4",
          children: [/* @__PURE__ */ jsx("div", {
            className: "h-2 bg-gray-200 rounded-full overflow-hidden",
            children: /* @__PURE__ */ jsx("div", {
              className: "h-full bg-blue-600 transition-all duration-300",
              style: {
                width: `${(step + 1) / filteredQuestions.length * 100}%`
              }
            })
          }), /* @__PURE__ */ jsxs("div", {
            className: "text-xs text-gray-500 text-center mt-1",
            children: ["Progression: ", step + 1, "/", filteredQuestions.length]
          })]
        })]
      }), showResult && /* @__PURE__ */ jsx(ResultsCard, {
        answers,
        totalScore,
        maxScore,
        percentage,
        interviewTime,
        formatTime,
        restartInterview,
        shareResults
      })]
    })
  });
};
const interview = UNSAFE_withComponentProps(Interview);
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: interview
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-WabgBupn.js", "imports": ["/assets/chunk-QMGIS6GS-hoMvXFpG.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-uHjRZ1l7.js", "imports": ["/assets/chunk-QMGIS6GS-hoMvXFpG.js"], "css": ["/assets/root-Cbhz-Bt3.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/interview": { "id": "routes/interview", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/interview-DSlAzIfm.js", "imports": ["/assets/chunk-QMGIS6GS-hoMvXFpG.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-3cb226da.js", "version": "3cb226da", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/interview": {
    id: "routes/interview",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
