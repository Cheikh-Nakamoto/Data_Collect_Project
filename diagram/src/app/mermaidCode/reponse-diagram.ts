export const ResponseDiagramCode = `
sequenceDiagram
    participant U as Répondant
    participant A as API Backend
    participant DB as Base de Donnees
    participant V as Service Vocal
    participant C as Cloud Storage
    participant N as Notifications

    Note over U,A: Réception du formulaire
    N->>U: Envoi email avec lien du formulaire
    U->>A: Cliquer sur lien pour accéder au formulaire
    A->>DB: Vérifier validité du lien + formulaire actif
    DB-->>A: Formulaire valide
    A-->>U: Afficher formulaire

    Note over U,A: Choix mode de réponse libre
    A-->>U: L'utilisateur peut répondre Écrit, Vocal ou Mixte, dans l'ordre de son choix

    alt Réponse anonyme
        A-->>U: Générer ID temporaire
    else Réponse identifiée
        U->>A: Se connecter / s’identifier
        A->>DB: Vérifier identité
        DB-->>A: Identité confirmée
    end

    loop Réponses libres
        alt Réponse écrite
            U->>A: Saisir réponse texte
            A->>C: Sauvegarder réponse cloud
            C-->>A: Confirmé
            A->>DB: Enregistrer chemin cloud + ID question + ID utilisateur/temporaire
            DB-->>A: Confirmé
        else Réponse vocale
            U->>V: Enregistrer réponse vocale
            V-->>A: Fichier audio
            A->>C: Sauvegarder audio cloud
            C-->>A: Confirmé
            A->>DB: Enregistrer chemin cloud + ID question + ID utilisateur/temporaire
            DB-->>A: Confirmé
        end
    end

    U->>A: Valider formulaire
    A->>DB: Marquer formulaire comme complété pour cet utilisateur/temporaire
    DB-->>A: Confirmé
    A-->>U: Confirmation de soumission

`;