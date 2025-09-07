export const creationDeFormDiagramCode = `
sequenceDiagram
    participant U as Utilisateur
    participant A as API Backend
    participant DB as Base de Donnees
    participant V as Service Vocal
    participant C as Cloud Storage
    participant N as Notifications

    U->>A: Accéder à la création de formulaire
    A->>DB: Vérifier plan et quotas
    DB-->>A: Plan utilisateur + quotas
    
    alt Quota dépassé
        A-->>U: Limite atteinte → Upgrade plan
    else Quota disponible
        A-->>U: Choix mode (Vocal / Écrit / Mixte)
        
        alt Mode Vocal
            loop Ajout questions vocales
                U->>V: Démarrer enregistrement
                V-->>U: Micro prêt
                U->>V: Parler question
                V-->>A: Fichier audio
                A->>C: Sauvegarder audio dans le cloud
                C-->>A: Confirmé
                A->>DB: Enregistrer chemin cloud dans DB
                DB-->>A: Confirmé
                V-->>U: Affichage texte structuré
                U->>A: Confirmer ou réenregistrer
                alt Réenregistrement
                    U->>V: Nouveau vocal
                    V-->>A: Nouveau fichier audio
                    A->>C: Sauvegarder nouveau fichier cloud
                    C-->>A: Confirmé
                    A->>DB: Enregistrer chemin cloud dans DB
                    DB-->>A: Confirmé
                end
            end
            
        else Mode Écrit
            loop Ajout questions
                U->>A: Saisir titre + questions + types
                opt Choix multiple
                    U->>A: Saisir options
                end
                A->>C: Sauvegarde cloud temporaire
                C-->>A: Confirmé
                A->>DB: Enregistrer chemin cloud dans DB
                DB-->>A: Confirmé
            end
            
        else Mode Mixte
            alt Vocal puis écrit
                loop Ajout questions vocales
                    U->>V: Enregistrer question
                    V-->>A: Fichier audio
                    A->>C: Sauvegarder audio cloud
                    C-->>A: Confirmé
                    A->>DB: Enregistrer chemin cloud dans DB
                    DB-->>A: Confirmé
                    U->>A: Compléter par écrit
                    A->>C: Sauvegarder modifications cloud
                    C-->>A: Confirmé
                    A->>DB: Enregistrer chemin cloud dans DB
                    DB-->>A: Confirmé
                end
            else Écrit puis vocal
                loop Ajout questions écrites
                    U->>A: Créer question
                    A->>C: Sauvegarde cloud
                    C-->>A: Confirmé
                    A->>DB: Enregistrer chemin cloud dans DB
                    DB-->>A: Confirmé
                end
                loop Ajout questions vocales
                    U->>V: Ajouter question vocale
                    V-->>A: Fichier audio
                    A->>C: Sauvegarder audio cloud
                    C-->>A: Confirmé
                    A->>DB: Enregistrer chemin cloud dans DB
                    DB-->>A: Confirmé
                end
            end
        end
        
        U->>A: Valider formulaire
        A->>DB: INSERT formulaire
        DB-->>A: ID généré
        A->>C: Sauvegarde finale cloud
        C-->>A: Confirmé
        A->>DB: Enregistrer chemin cloud final
        DB-->>A: Confirmé
        A->>DB: Mettre à jour quotas
        DB-->>A: Confirmé
        A-->>U: Formulaire créé et public
        
        U->>A: Choix méthode de réponse
        alt Réponse anonyme
            A-->>U: Générer identifiant temporaire
            U->>A: Soumettre réponses avec ID temporaire
            A->>DB: Enregistrer réponses + ID temporaire
            DB-->>A: Confirmé
        else Réponse identifiée
            U->>A: Se connecter / s’identifier
            A->>DB: Vérifier identité
            DB-->>A: Identité confirmée
            U->>A: Soumettre réponses
            A->>DB: Enregistrer réponses + ID utilisateur
            DB-->>A: Confirmé
        end
        
        U->>A: Partager formulaire
        alt Partage Email
            A->>DB: Générer liens personnalisés
            DB-->>A: Liens
            A->>N: Envoyer emails
            N-->>A: Confirmé
            A-->>U: Confirmation
        else Partage QR Code
            A->>U: Générer QR Code
        else Lien direct
            A->>DB: Générer lien
            DB-->>A: Lien
            A-->>U: Lien copié
        end
        
        A->>DB: Sauvegarde tracking
        A->>C: Sauvegarde tracking cloud
        C-->>A: Confirmé
        DB-->>A: Confirmé
        A-->>U: Formulaire prêt + liens actifs
    end


`;