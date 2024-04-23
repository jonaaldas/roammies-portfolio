<template>
	<div class="flex flex-row flex-wrap gap-3 m-10">
		<div class="card bg-base-100 shadow-xl" style="flex: 0 0 auto">
			<div class="card-body">
				<div class="card-title">Upload New Schools</div>
				<div class="grid grid-cols-3 gap-5">
					<label class="form-control w-full max-w-xs">
						<div class="label">
							<span class="label-text">Name</span>
						</div>
						<input required type="text" placeholder="School name..." class="input input-bordered w-full max-w-xs" v-model="data.name" />
					</label>

					<label class="form-control w-full max-w-xs">
						<div class="label">
							<span class="label-text">Whatsapp Number</span>
						</div>
						<input type="text" placeholder="Whatsapp Number" class="input input-bordered w-full max-w-xs" v-model="data.phone_number" />
						<div class="label">
							<span class="label-text-alt">Write phone number with no + sign and include country code 1 732 485 2785</span>
						</div>
					</label>
					<label class="form-control w-full max-w-xs">
						<div class="label">
							<span class="label-text">Email</span>
						</div>
						<input type="text" placeholder="Email" class="input input-bordered w-full max-w-xs" v-model="data.email" />
					</label>

					<label class="form-control">
						<div class="label">
							<span class="label-text">About</span>
						</div>
						<textarea class="textarea textarea-bordered h-24" maxlength="160" placeholder="About" v-model="data.about"></textarea>
					</label>

					<label class="form-control">
						<div class="label">
							<span class="label-text">Short-term Details</span>
						</div>
						<textarea class="textarea textarea-bordered h-24" maxlength="160" placeholder="Short-term Details" v-model="data.short_term_details"></textarea>
					</label>

					<label class="form-control">
						<div class="label">
							<span class="label-text">Sign-up Details</span>
						</div>
						<textarea class="textarea textarea-bordered h-24" maxlength="160" placeholder="Sign-up Details" v-model="data.sign_up_details"></textarea>
					</label>
					<label class="form-control w-full max-w-xs">
						<div class="label">
							<span class="label-text">City</span>
						</div>
						<input type="text" placeholder="New York" class="input input-bordered w-full max-w-xs" v-model="data.city" />
						<div class="label">
							<span class="label-text-alt">Write one city</span>
						</div>
					</label>

					<label class="form-control w-full max-w-xs">
						<div class="label">
							<span class="label-text">Country</span>
						</div>
						<select class="select select-bordered" v-model="data.country">
							<option v-for="country in locations">{{ country.country }}</option>
						</select>
					</label>

					<label class="form-control w-full max-w-xs">
						<div class="label">
							<span class="label-text">Address</span>
						</div>
						<input type="text" placeholder="Address" class="input input-bordered w-full max-w-xs" v-model="data.address" />
					</label>

					<label class="form-control w-full max-w-xs space-y-3">
						<div class="label">
							<span class="label-text">Map Coordinates</span>
						</div>
						<span class="label-text text-xs mr-2">Write the coordinates here (lng, lat). Range from -180 to 180 for longitude and 90 to 90 for latitude. Separate with a coma. .</span>
						<span class="label-text text-xs mr-2">
							Get coordinates from
							<a href="#">Here</a>
						</span>
						<input type="text" placeholder="Long, Lat" class="input input-bordered w-full max-w-xs" v-model="data.coordinates" />
					</label>

					<label class="form-control w-full max-w-xs space-y-3">
						<div class="label">
							<span class="label-text">Social Media Links</span>
						</div>
						<input type="text" placeholder="Facebook" v-model="data.facebook" class="input input-bordered w-full max-w-xs" />
						<input type="text" placeholder="Instagram" v-model="data.instagram" class="input input-bordered w-full max-w-xs" />
					</label>

					<label class="form-control w-full max-w-xs">
						<div class="label">
							<span class="label-text">Ages</span>
						</div>
						<input type="text" placeholder="Ex. 0-60" class="input input-bordered w-full max-w-xs" v-model="data.ages" />
						<div class="label">
							<span class="label-text-alt">Write age range in months. Ex. 0-6 years (0-72)</span>
						</div>
					</label>

					<label class="form-control w-full max-w-xs">
						<div class="label">
							<span class="label-text">Website Link</span>
						</div>
						<input type="text" placeholder="www.link.com" class="input input-bordered w-full max-w-xs" v-model="data.website_link" />
					</label>

					<label class="form-control w-full max-w-xs">
						<div class="label">
							<span class="label-text">Type</span>
						</div>
						<select class="select select-bordered" v-model="data.type">
							<option value="School">School</option>
							<option value="Co-working + Childcare">Co-working + Childcare</option>
							<option value="Indoor Playground">Indoor Playground</option>
						</select>
					</label>

					<label class="form-control w-full max-w-xs">
						<div class="label">
							<span class="label-text">Availability</span>
						</div>
						<div id="typeOfSchoolContainer" class="space-x-3 pb-3"></div>
						<select class="select select-bordered" v-model="typeOfSchoolSelected" @change="addTab(e)">
							<option disabled selected>Pick one</option>
							<option value="Short-term">Short-term</option>
							<option value="Open-enrollment">Open-enrollment</option>
							<option value="Drop-in/Flexible">Drop-in/Flexible</option>
							<option value="Hybrid">Hybrid</option>
							<option value="TBD">TBD</option>
						</select>
					</label>

					<label class="form-control w-full max-w-xs">
						<div class="label">
							<span class="label-text">Upload Image</span>
						</div>
						<input type="file" class="file-input file-input-bordered w-full max-w-xs" @change="e => getImage(e)" />
					</label>
					<div class="form-control">
						<label class="label cursor-pointer">
							<span class="label-text">Featured School</span>
							<input type="checkbox" checked="checked" class="checkbox" v-model="isFeatured" />
						</label>
					</div>
				</div>
				<div class="card-actions mt-3">
					<button class="btn btn-secondary" @click="upload()">
						<span v-if="!loading">Upload</span>
						<span v-if="loading" class="loading loading-xs"></span>
					</button>
				</div>
				<span v-if="response">
					{{ response }}
				</span>
			</div>
		</div>

		<div class="card shadow-xl h-52 justify-center items-center p-4" style="flex: 0 0 auto">
			File upload coming soon...
			<input type="file" disabled class="file-input file-input-bordered w-full max-w-xs" />
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				data: {
					coordinates: '',
					availability: '',
					name: '',
					phone_number: '',
					country: '',
					address: '',
					city: '',
					about: '',
					ages: '',
					website_link: '',
					about: '',
					type: '',
					facebook: '',
					instagram: '',
					short_term_details: '',
					sign_up_details: '',
					image_name: null
				},
				locations: [],
				typeOfSchoolSelected: '',
				typeOfSchool: [],
				selectedFile: null,
				loading: false,
				isFeatured: false,
				demotData: {
					coordinates: '-90,-180',
					availability: [
						{
							id: 1704563369013,
							name: 'Flexible'
						}
					],
					facebook: 'https://www.facebook.com/Play-And-Learn-Child-Care-Center-LLC-100479908274',
					instagram: 'https://www.instagram.com/playandlearnchildcarecenter/',
					name: 'Test 123 123',
					phone_number: '7324852784',
					country: 'United States',
					address: '7680 NW 5th St Building 3 apartment 2J',
					city: 'NYC',
					about:
						"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap ",
					ages: '0-60',
					website_link: 'www.google.com',
					email: 'jonaaldas@gmail.com',
					type: 'Indoor Playground',
					short_term_details: 'Lorem Ipsum is simply dummy text of the printing ',
					sign_up_details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when ',
					image_name: ''
				},
				response: null
			};
		},
		methods: {
			async getLocations() {
				const response = await $fetch('/api/locations', {
					method: 'GET',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					}
				});
				this.locations = response.body.locations;
			},
			addTab(e) {
				const container = document.querySelector('#typeOfSchoolContainer');

				const newPillId = Date.now();

				const html = `<div class="badge badge-accent gap-2" data-pill-id="${newPillId}">
									<div class="delete-pill-button xs" data-pill-id="${newPillId}">
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-4 h-4 stroke-current">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
										</svg>
									</div>
									${this.typeOfSchoolSelected}
								</div>`;
				container.insertAdjacentHTML('beforeend', html);

				this.typeOfSchool.push({id: newPillId, name: this.typeOfSchoolSelected});

				this.attachDeleteEventListeners();
			},
			attachDeleteEventListeners() {
				const deleteButtons = document.querySelectorAll('.delete-pill-button');
				deleteButtons.forEach(button => {
					button.addEventListener('click', () => {
						const pillId = button.getAttribute('data-pill-id');
						this.deleteTypeOfSchool(pillId);
					});
				});
			},
			deleteTypeOfSchool(pillId) {
				const pillElement = document.querySelector(`[data-pill-id="${pillId}"]`);
				if (pillElement) {
					pillElement.remove();
				}
				this.typeOfSchool = this.typeOfSchool.filter(item => parseInt(item.id) !== parseInt(pillId));
			},
			handleFileUpload(event) {
				this.selectedFile = event.target.files[0];
			},
			getImage(e) {
				this.selectedFile = e.target.files[0];
			},
			async uploadImage() {
				const file = this.selectedFile;
				try {
					const url = await $fetch('/api/s3');

					await $fetch(url.body.url, {
						method: 'PUT',
						headers: {
							'Content-Type': 'multipart/form-data',
							'Access-Control-Allow-Origin': '*'
						},
						body: file
					});

					const didUpload = await $fetch('/api/file', {
						method: 'POST',
						body: {
							imageName: url.body.imageName
						}
					});

					if (!didUpload.body.success) {
						return '';
					}

					return url.body.imageName;
				} catch (error) {
					console.log('🚀 ~ error:', error);
				}
			},
			async upload() {
				this.loading = true;
				try {
					this.demotData.image_name = await this.uploadImage();

					this.demotData.availability = this.typeOfSchool;

					const response = await $fetch('/api/save_school', {
						method: 'POST',
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json'
						},
						body: {
							data: this.demotData,
							isFeatured: this.isFeatured
						}
					});

					if (response.body.success) {
						this.response = response.body.message;
						this.data = {
							coordinates: '',
							availability: '',
							name: '',
							phone_number: '',
							country: '',
							address: '',
							city: '',
							about: '',
							ages: '',
							website_link: '',
							about: '',
							type: '',
							facebook: '',
							instagram: '',
							short_term_details: '',
							sign_up_details: ''
						};
						this.typeOfSchool = [];
						this.selectedFile = null;
						this.typeOfSchoolSelected = '';
						const typeOfSchoolsContainer = document.querySelector('#typeOfSchoolContainer');
						typeOfSchoolsContainer.innerHTML = '';
					} else if (!response.body.success) {
						this.response = response.body.message;
						console.log(response.body.message);
					}
				} catch (error) {
					this.response = error;
					console.log('🚀 ~ file: Upload.vue:208 ~ upload ~ error:', error);
				} finally {
					this.loading = false;
					setTimeout(() => {
						this.response = '';
					}, 2000);
				}
			}
		},
		mounted() {
			this.getLocations();
		}
	};
</script>
