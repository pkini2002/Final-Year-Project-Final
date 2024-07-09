from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('registration/', views.registration,name='registration'),
    path('hallticket/', views.hallticket,name='hallticket'),
    path('application/', views.application,name='application'),
    path('halltickettemplate/', views.halltickettemplate,name='halltickettemplate'),
    path('about/', views.about,name='about'),
    path('c/', views.c,name='c'),
    path('carousel/', views.carousel,name='carousel'),
    path('carouselcard/', views.carouselcard,name='carouselcard'),
    path('eligibility/', views.eligibility,name='eligibility'),
    path('footer/', views.footer,name='footer'),
    path('statistic/', views.statistic,name='statistic'),
    path('videos', views.videos,name='videos'),
    path('visionmission', views.visionmission,name='visionmission'),
    path('AIDS', views.AIDS,name='AIDS'),
    path('AIML', views.AIML,name='AIML'),
    path('BIO', views.BIO,name='BIO'),
    path('CCE', views.CCE,name='CCE'),
    path('Civil', views.Civil,name='Civil'),
    path('CSC', views.CSC,name='CSC'),
    path('CSE', views.CSE,name='CSE'),
    path('CSF', views.CSF,name='CSF'),
    path('EC', views.EC,name='EC'),
    path('EE', views.EE,name='EE'),
    path('EV', views.EV,name='EV'),
    path('IS', views.IS,name='IS'),
    path('ME', views.ME,name='ME'),
    path('RA', views.RA,name='RA'),
    path('aboutus',views.aboutus,name='aboutus'),
    path('administrator',views.admin,name='admin'),
    path('admissions',views.admissions,name='admissions'),
    path('',views.index,name='index'),
    path('capture-photos/', views.capture_photos, name='capture_photos'),
    path('success/', views.success, name='success'),
    # path('view-demo/', views.view_demo, name='view_demo'),
    path('view-demo/<str:username>/<str:password>/', views.view_demo, name='view_demo'),
    path('examportal/', views.examportal, name='examportal'),
    path('examPortalQues/', views.examPortalQues, name='examPortalQues'),
    path('examportalRej/', views.examportalRej, name='examportalRej'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    urlpatterns+=static(settings.STATIC_URL,document_root=settings.STATIC_ROOT)