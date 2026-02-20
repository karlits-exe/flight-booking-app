<template>
	<nav id="nav" class="navbar navbar-expand-lg bg-primary px-4 sticky-top">
      <div class="container-fluid">
        <a class="navbar-brand fw-bold text-warning" href="/">WORLD CLASS</a>

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
            <router-link to="/login"><button class="btn btn-sm btn-outline-light me-2">Log In</button></router-link>
            <router-link to="/signup"><button class="btn btn-sm btn-light text-primary">Sign Up</button></router-link>
          </div>
        </div>
      </div>
    </nav>
</template>

<script setup>
import { ref } from "vue"

const navLinks = ref(["Link", "Link", "Link", "Link"])

</script>