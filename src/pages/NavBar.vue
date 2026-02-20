<template>
	<nav id="nav" class="navbar navbar-expand-lg navbar-dark px-4 sticky-top">
      <div class="container-fluid">
        <a class="navbar-brand fw-bold text-warning" href="#">Logo</a>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto ms-4">
            <li class="nav-item" v-for="(link, index) in navLinks" :key="index">
              <a class="nav-link text-white" href="#">{{ link }}</a>
            </li>
          </ul>

          <div>
            <button class="btn btn-outline-light me-2">Login</button>
            <button class="btn btn-light text-primary">Sign Up</button>
          </div>
        </div>
      </div>
    </nav>
</template>

<script setup>
import { ref } from "vue"

const navLinks = ref(["Link", "Link", "Link", "Link"])

</script>