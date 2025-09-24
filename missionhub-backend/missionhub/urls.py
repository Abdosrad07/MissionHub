"""
URL configuration for missionhub project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.views.generic import RedirectView
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
from missions.views import (
    UserProfileViewSet, MissionViewSet, UserMissionViewSet, mark_notification_read, custom_login_view,
    RegisterViewSet, CustomTokenObtainPairView, user_proofs, user_notifications, list_missions,
    choose_mission, mission_detail, submit_proof, user_profile, product_list, create_product,
    product_detail, start_purchase, edit_proof, delete_proof, signup, pi_authenticate,
    pi_withdraw, pi_payment_webhook, mark_shipped, confirm_receipt, privacy_policy, terms_of_service
)


router = routers.DefaultRouter()
router.register(r'user-profile', UserProfileViewSet, basename='user-profile')
router.register(r'missions', MissionViewSet, basename='missions')
router.register(r'user-missions', UserMissionViewSet, basename='user-missions')
router.register(r'auth', RegisterViewSet, basename='auth')

api_patterns = [
    path('', include(router.urls)),
    # Pi Network API endpoints
    path('pi/auth/', pi_authenticate, name='pi_authenticate'),
    path('pi/withdraw/', pi_withdraw, name='pi_withdraw'),
    path('pi/webhook/', pi_payment_webhook, name='pi_webhook'),
    # API for purchase flow
    path('marketplace/product/<int:product_id>/start-purchase/', start_purchase, name='start_purchase'),
    path('marketplace/purchase/<int:purchase_id>/mark-shipped/', mark_shipped, name='mark_shipped'),
    path('marketplace/purchase/<int:purchase_id>/confirm-receipt/', confirm_receipt, name='confirm_receipt'),
]

urlpatterns = [
    path('admin/', admin.site.urls),
   # API endpoints
    path('api/', include(api_patterns)),
    path('api/token/', include('missions.urls_token')),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
   # Web pages
    path('', RedirectView.as_view(pattern_name='login', permanent=False), name='home'),
    path('my-proofs/', user_proofs, name='user_proofs'),
    path('notifications/', user_notifications, name='user_notifications'),
    path('notifications/<int:notification_id>/read/', mark_notification_read, name='mark_notification_read'),

    path('missions/', list_missions, name='list_missions'),
    path('missions/<int:mission_id>/choose/', choose_mission, name='choose_mission'),
    path('missions/<int:mission_id>/', mission_detail, name='mission_detail'),
    path('missions/session/<int:session_id>/submit-proof/', submit_proof, name='submit_proof'),
    path('profile/', user_profile, name='user_profile'),
    path('marketplace/', product_list, name='product_list'),
    path('marketplace/product/<int:product_id>/', product_detail, name='product_detail'),
    path('marketplace/create/', create_product, name='create_product'),
    path('proofs/<int:proof_id>/edit/', edit_proof, name='edit_proof'),
    path('proofs/<int:proof_id>/delete/', delete_proof, name='delete_proof'),
    path('login/', custom_login_view, name='login'),    
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('signup/', signup, name='signup'),
    path('privacy-policy/', privacy_policy, name='privacy_policy'),
    path('terms-of-service/', terms_of_service, name='terms_of_service'),
]

# Servir les fichiers médias en mode DEBUG
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
