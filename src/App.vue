<template>
  <div class="mt-20">
    <div class="container mx-auto px-10">
      <nav class="mb-20">
        <ul class="flex space-x-4">
          <li>
            <router-link
              to="/"
              class="px-4 py-2 text-gray-700 rounded hover:bg-gray-200"
              active-class="bg-gray-200 font-bold"
            >
              Dynamic form
            </router-link>
          </li>
          <li>
            <router-link
              to="/toolBox"
              class="px-4 py-2 text-gray-700 rounded hover:bg-gray-200"
              active-class="bg-gray-200 font-bold"
            >
              Tool box
            </router-link>
          </li>
        </ul>
      </nav>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {};
</script>
