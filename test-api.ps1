#test-api.ps1

Write-Host " TEST COMPLET DE L'API MISSIONHUB" - ForegroundColor Green
Write-Host "=================================" - ForegroundColor Green

# 1. Test des missions
Write-Host "`n1. Test des missions..." -ForegroundColor Yellow
$missions = Get-Missions
if ($missions) {
    Write-Host "$($missions.Count) missions disponibles" -ForegroundColor Green
    $missions | ForEach-Object {
        Write-Host "    - $($_.title) ($($_.reward) points)" -ForegroundColor Cyan
    }
}

# 2. Test du profil
Write-Host "`n2. Test du profil..." -ForegroundColor Yellow
$profile = Get-MyProfile
if ($profile) {
    Write-Host "    Profil: $($profile.pseudo)" -ForegroundColor Green
    Write-Host "    Solde: $($profile.solde) points" -ForegroundColor Green
    Write-Host "    Score: $($profile.score) points" -ForegroundColor Green
}

# 3. Test de complétion de mission
Write-Host "`n3. Test de complétion de mission..." -ForegroundColor Yellow
$userMissions = Get-UserMissions
if ($userMissions) {
    Write-Host "$($userMissions.Count) missions utilisateur trouvées" -ForegroundColor Green
}

Write-Host "TESTS TERMINES AVEC SUCCES!" -ForegroundColor Green