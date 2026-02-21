<template>
	<nav id="nav" class="navbar navbar-light navbar-expand-lg bg-primary px-4 sticky-top">
      <div class="container-fluid">
        <a class="navbar-brand fw-bold text-warning" href="/">WORLD CLASS</a>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          style="filter: invert(1);"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto ms-lg-4 ms-0">
            <li class="nav-item" v-for="(link, index) in navLinks" :key="index">
              <a class="nav-link text-white" href="#">{{ link }}</a>
            </li>
            <li class="nav-item d-inline d-lg-none">
              <router-link to="/login" class="nav-link text-white">Log In</router-link>
            </li>
            <li class="nav-item d-inline d-lg-none">
              <router-link to="/signup" class="nav-link text-white">Sign Up</router-link>
            </li>
          </ul>

          <div class="d-none d-lg-inline">
            <router-link to="/login"><button class="btn btn-sm btn-outline-light me-3 text-uppercase">Log In</button></router-link>
            <router-link to="/signup"><button class="btn btn-sm btn-light text-primary text-uppercase">Sign Up</button></router-link>
          </div>
        </div>
      </div>
    </nav>
</template>

<script setup>
import { ref } from "vue"

const navLinks = ref(["Link", "Link", "Link", "Link"])

</script>