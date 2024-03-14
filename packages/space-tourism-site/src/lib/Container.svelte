<script>
    import Navbar from "$lib/Navbar.svelte";
</script>

<div class="{ `bg-no-repeat bg-cover bg-origin-border flex flex-col ${$$restProps.class}`}">
    <header>
        <Navbar/>
    </header>
    <slot></slot>
</div>