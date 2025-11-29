from django.contrib import admin
from .models import DoctorProfile


@admin.register(DoctorProfile)
class DoctorProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'full_name', 'email', 'specialization', 'hospital', 'updated_at')
    list_filter = ('specialization', 'city', 'state')
    search_fields = ('user__email', 'full_name', 'phone', 'license_number', 'hospital')
    readonly_fields = ('created_at', 'updated_at')
    
    fieldsets = (
        ('User Information', {
            'fields': ('user', 'full_name', 'email', 'phone')
        }),
        ('Professional Details', {
            'fields': ('specialization', 'license_number', 'experience')
        }),
        ('Location', {
            'fields': ('hospital', 'address', 'city', 'state', 'pincode')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
