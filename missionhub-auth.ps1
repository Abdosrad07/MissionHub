#missionhub-auth.ps1
function Get-MissionHubToken {
    $body = @{
        username = "ahmed"
        password = "boussole"
    } | ConvertTo-Json

    $response = Invoke-RestMethod "http://localhost:8000/api/token/" `
        -Method Post `
        -Body $body `
        -ContentType "application/json"
    
    return $response.access
}

function Invoke-MissionHubRequest {
    param(
        [string]$Endpoint,
        [string]$Method = "GET",
        [string]$Body = $null
    )

    $token = Get-MissionHubToken
    $headers = @{
        "Authorization" = "Bearer $token"
        "Content-Type" = "application/json"
    }

   # Pour les requêtes GET seulement
   if ($Method -eq "GET") {
        return Invoke-RestMethod -Uri "http://localhost:8000$Endpoint" -Method GET -Headers $headers
   }
   else {
    Write-Host "Cette API n'accepte que les requêtes GET" -ForegroundColor Red
    return $null
   }
}

#Fonctions spécifiques pour ton API
function Get-Missions {
    return Invoke-MissionHubRequest "/api/missions/"
}

function Get-MyProfile {
    return Invoke-MissionHubRequest "/api/profile/"
}

function Get-UserMissions {
    return Invoke-MissionHubRequest "/api/user-missions/"
}

Write-Host "MissionHub functions loaded (GET only)!" -ForegroundColor Green
Write-Host "Commandes disponibles:" -ForegroundColor Yellow
Write-Host "    *   Get-Missions" -ForegroundColor Cyan
Write-Host "    *   Get-MyProfile" -ForegroundColor Cyan
Write-Host "    *   Get-UserMissions" -ForegroundColor Cyan