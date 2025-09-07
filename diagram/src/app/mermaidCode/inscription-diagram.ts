export const inscriptionDiagramCode = `
 sequenceDiagram
    participant U as Utilisateur
    participant A as API Backend
    participant DB as Base de Donnees
    participant E as Service Email

    Note over U,E: Processus inscription utilisateur

    U->>A: Acceder page inscription
    A->>DB: SELECT user WHERE session_id
    DB-->>A: Resultat requete
    
    alt Utilisateur connecte
        A-->>U: Redirection vers tableau de bord
    else Nouvel utilisateur
        A-->>U: Afficher formulaire inscription
        U->>A: Choisir langue (Francais/Wolof/Pulaar)
        
        A-->>U: Demander email
        U->>A: Saisir email
        A-->>U: Email valide
        A-->>U: Demander nom complet
        
        U->>A: Saisir nom
        A-->>U: Demander organisation/profession
        
        U->>A: Saisir organisation
        A-->>U: Demander numero de telephone
        
        U->>A: Saisir telephone
        A-->>U: Choisir type de compte (Freemium/Pro)
        
        U->>A: Selectionner type compte
        A->>DB: INSERT INTO users
        DB-->>A: Confirmation creation avec user_id
        
        A->>E: Envoyer email de bienvenue
        E-->>A: Email envoye
        
        A-->>U: Compte cree avec succes (Verification email)
        A->>U: Redirection vers tableau de bord
    end

    Note over U,E: Fin du processus inscription
`;