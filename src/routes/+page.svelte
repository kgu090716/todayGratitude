<script>
  import { ClipboardCopy } from 'lucide-svelte';
  import { RotateCw } from 'lucide-svelte';
  import { extractFiveThanks } from './func';

  let thanks = extractFiveThanks();

  function refreshThanks() {
    thanks = extractFiveThanks();
  }

  let copyConfirmed = [0, 0, 0, 0, 0];

  function handleClick(node, params) {
    const onClick = () => {
      console.log(params);
      copyToClipboard(params.thank, params.idx);
    };

    node.addEventListener('click', onClick);

    return {
      destroy() {
        node.removeEventListener('click', onClick);
      }
    };
  }

  function copyToClipboard(text, idx) {
    try {
      navigator.clipboard.writeText(text) // 복사하기
          .then(() => {
              // console.log('클립보드에 복사되었습니다.');
              copyConfirmed[idx] = 1;
              setTimeout(() => copyConfirmed[idx] = 0, 2000);
          })
          .catch(err => {
              // console.error('클립보드 복사에 실패했습니다.', err);
              copyConfirmed[idx] = -1;
              setTimeout(() => copyConfirmed[idx] = 0, 2000);
          });
        }
        catch {
          console.log("error");
            copyConfirmed[idx] = -1;
            setTimeout(() => copyConfirmed[idx] = 0, 1000);
        }
  }

</script>


<!-- NavBar -->
<div class="navbar bg-base-100">
  <div class="flex-1">
    <a class="btn btn-ghost text-xl">Today's Gratitude</a>
  </div>
  <div class="flex-none">
    <button class="btn btn-square btn-ghost">
<label class="swap swap-rotate">
  <!-- this hidden checkbox controls the state -->
  <input type="checkbox" class="theme-controller invisible" value="dracula"/>

  <!-- sun icon -->
  <svg
    class="swap-off h-10 w-10 fill-current"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24">
    <path
      d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
  </svg>

  <!-- moon icon -->
  <svg
    class="swap-on h-10 w-10 fill-current"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24">
    <path
      d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
  </svg>
</label>
    </button>
  </div>
</div>

<!-- Content -->
<div class="flex flex-col justify-center items-center">

{#each thanks as thank, idx}
{#if copyConfirmed[idx] == 1}
<div class="card m-2 bg-success w-[calc(100%-60px)] shadow-xl">
  <div class="card-body flex flex-row justify-between items-center">
    <h2 class="card-title">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-6 w-6 shrink-0 stroke-current"
    fill="none"
    viewBox="0 0 24 24">
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  클립보드에 복사되었습니다.
    </h2>
  </div>
</div>
{:else if copyConfirmed[idx] == -1}
<div class="card m-2 bg-error w-[calc(100%-60px)] shadow-xl">
  <div class="card-body flex flex-row justify-between items-center">
    <h2 class="card-title">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-6 w-6 shrink-0 stroke-current"
    fill="none"
    viewBox="0 0 24 24">
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  클립보드 복사에 실패했습니다.
    </h2>
  </div>
</div>
{:else}
<!-- Card -->
<div class="card m-2 bg-base-100 w-[calc(100%-60px)] shadow-xl">
  <div class="card-body flex flex-row justify-between items-center">
    <h2 class="card-title">{thank}</h2>
    <div class="card-actions justify-end">
      <button class="btn" use:handleClick={{thank, idx}}>
        <ClipboardCopy/>
      </button>
    </div>
  </div>
</div>
<!-- /Card -->
{/if}
{/each}


<button class="btn btn-neutral w-[calc(100%-60px)] m-5" onclick={refreshThanks}>
  <RotateCw />
</button>


</div>
<!-- /Content -->

<!-- <h1>{data.result}</h1> -->

