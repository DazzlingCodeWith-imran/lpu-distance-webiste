// admission-form.js - LPU Admission Form Handler

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Admission form script loaded!');

    const form = document.getElementById('applicationForm');
    const submitBtn = document.getElementById('submitBtn');
    const submitText = document.getElementById('submitText');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const successMsg = document.getElementById('successMessage');
    const formError = document.getElementById('formError');

    // Agar form exist nahi karta toh return
    if (!form) {
        console.error('❌ Form not found!');
        return;
    }

    // Real-time validation feedback
    document.querySelectorAll('#applicationForm .form-control, #applicationForm .form-select').forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.classList.add('is-invalid');
            } else {
                this.classList.remove('is-invalid');
            }
        });

        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.classList.remove('is-invalid');
            }
        });
    });

    // Mobile number - only digits
    const mobileInput = document.getElementById('mobile');
    if (mobileInput) {
        mobileInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }

    // Form Submit
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        console.log('📤 Form submitted!');

        // Reset error
        formError.style.display = 'none';
        formError.textContent = '';

        // Validation
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('is-invalid');
                isValid = false;
            }
        });

        if (!isValid) {
            formError.textContent = 'Please fill all required fields.';
            formError.style.display = 'block';
            return;
        }

        // Mobile validation
        const mobile = document.getElementById('mobile').value.trim();
        if (!/^[0-9]{10}$/.test(mobile)) {
            document.getElementById('mobile').classList.add('is-invalid');
            formError.textContent = 'Please enter a valid 10-digit mobile number.';
            formError.style.display = 'block';
            return;
        }

        // Email validation
        const email = document.getElementById('email').value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            document.getElementById('email').classList.add('is-invalid');
            formError.textContent = 'Please enter a valid email address.';
            formError.style.display = 'block';
            return;
        }

        // Course validation
        const course = document.getElementById('course').value;
        if (!course) {
            document.getElementById('course').classList.add('is-invalid');
            formError.textContent = 'Please select a course.';
            formError.style.display = 'block';
            return;
        }

        // Hide error
        formError.style.display = 'none';

        // Show loading state
        submitBtn.disabled = true;
        submitText.style.display = 'none';
        loadingSpinner.style.display = 'inline';

        // Collect data
        const formData = {
            fullName: document.getElementById('fullName').value.trim(),
            email: email,
            mobile: mobile,
            course: course,
            city: document.getElementById('city').value.trim() || '',
            qualification: document.getElementById('qualification').value || '',
            sourcePage: window.location.pathname || 'index.html'
        };

        console.log('📦 Sending data:', formData);

        try {
            // API Call - Backend URL
            const API_URL = 'http://localhost:5000/api/applications';
            
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log('📥 Response:', data);

            if (response.ok && data.success) {
                // Success
                form.style.display = 'none';
                successMsg.style.display = 'block';
                
                // Reset form after 5 seconds
                setTimeout(() => {
                    const modal = bootstrap.Modal.getInstance(document.getElementById('applyModal'));
                    if (modal) {
                        modal.hide();
                    }
                    
                    // Reset form
                    form.reset();
                    form.style.display = 'block';
                    successMsg.style.display = 'none';
                    
                    // Remove invalid classes
                    document.querySelectorAll('.is-invalid').forEach(el => {
                        el.classList.remove('is-invalid');
                    });
                }, 5000);

            } else {
                // Error from backend
                formError.textContent = data.message || 'Something went wrong. Please try again.';
                formError.style.display = 'block';
                
                // If duplicate mobile, highlight mobile field
                if (data.message && data.message.includes('mobile')) {
                    document.getElementById('mobile').classList.add('is-invalid');
                }
            }

        } catch (error) {
            console.error('❌ Network Error:', error);
            formError.textContent = 'Network error! Please check if backend server is running.';
            formError.style.display = 'block';
        } finally {
            // Reset button
            submitBtn.disabled = false;
            submitText.style.display = 'inline';
            loadingSpinner.style.display = 'none';
        }
    });
});