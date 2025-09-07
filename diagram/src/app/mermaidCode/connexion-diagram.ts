export const connexionDiagramCode = `
sequenceDiagram
    participant U as Utilisateur
    participant A as API Backend
    participant DB as Base de Donnees
    participant S as Service Session

    Note over U,S: Processus connexion utilisateur

    U->>A: Accéder page de connexion
    A->>S: Vérifier token session
    S-->>A: Token invalide/expiré
    
    alt Session valide
        A-->>U: Redirection vers tableau de bord
    else Session invalide
        A-->>U: Afficher formulaire de connexion
        
        U->>A: Saisir email/téléphone + mot de passe
        A->>DB: SELECT user WHERE email/phone
        DB-->>A: Données utilisateur
        
        alt Utilisateur trouvé
            A->>A: Vérifier mot de passe hash
            
            alt Mot de passe correct
                A->>S: Créer nouvelle session
                S-->>A: Token session généré
                A->>DB: UPDATE last_login
                DB-->>A: Confirmation mise à jour
                A-->>U: Connexion réussie + token (redirection)
                
            else Mot de passe incorrect
                A->>DB: INCREMENT failed_attempts
                DB-->>A: Tentatives mises à jour
                A-->>U: Erreur mot de passe incorrect + retry
                
                alt Trop de tentatives
                    A-->>U: Compte temporairement bloqué + reset password
                end
            end
            
        else Utilisateur non trouvé
            A-->>U: Message erreur + lien inscription
        end
        
        opt Mot de passe oublié
            U->>A: Demande reset password
            A->>DB: Vérifier email existe
            DB-->>A: Email valide
            A-->>U: Email reset envoyé
        end
    end

    Note over U,S: Fin du processus connexion

`;