import { cn } from "@/lib/utils"

export type IconProps = React.HTMLAttributes<SVGElement>

export const Icons = {
  Loader: ({ className, ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("animate-spin", className)}
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  ),
  Setting: ({ className, ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      viewBox="0 0 42 42"
      className={cn(className)}
      {...props}
    >
      <path
        fill="currentColor"
        d="M6.62 24.5c.4 1.62 1.06 3.13 1.93 4.49l-2.43 2.44c-1.09 1.09-1.08 1.74-.12 2.7l2.37 2.37c.97.971 1.63.95 2.7-.12l2.55-2.56c1.2.688 2.5 1.22 3.88 1.56v3.12c0 1.55.47 2 1.82 2h3.36c1.37 0 1.82-.48 1.82-2v-3.12c1.38-.34 2.68-.87 3.88-1.56l2.61 2.619c1.08 1.068 1.729 1.09 2.699.131l2.381-2.381c.949-.949.97-1.602-.131-2.699l-2.5-2.5a14.665 14.665 0 0 0 1.938-4.49h3.302c1.368 0 1.818-.48 1.818-2v-3c0-1.48-.393-2-1.818-2h-3.302c-.34-1.38-.87-2.68-1.562-3.88l2.382-2.37c1.05-1.05 1.14-1.7.13-2.7l-2.38-2.38c-.95-.95-1.632-.94-2.7.13l-2.26 2.25A14.946 14.946 0 0 0 24.5 6.62V3.5c0-1.48-.391-2-1.82-2h-3.36c-1.35 0-1.82.49-1.82 2v3.12c-1.62.4-3.13 1.06-4.49 1.93L10.75 6.3C9.68 5.23 9 5.22 8.05 6.17L5.67 8.55c-1.01 1-.92 1.65.13 2.7l2.37 2.37c-.68 1.2-1.21 2.5-1.55 3.88h-3.3c-1.35 0-1.82.49-1.82 2v3c0 1.55.47 2 1.82 2h3.3zm8.66-3.5c0-3.16 2.56-5.72 5.72-5.72s5.721 2.56 5.721 5.72a5.72 5.72 0 1 1-11.441 0z"
      />
    </svg>
  ),
  SignOut: ({ className, ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      viewBox="0 0 16 16"
      className={cn(className)}
      {...props}
    >
      <path fill="currentColor" d="M14 0h2v16h-2V0zM8 6H0v4h8v3l5-5l-5-5z" />
    </svg>
  ),
  Tiktok: ({ className, ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 291.72499821636245 291.1"
      className={cn(className)}
      {...props}
    >
      <path d="M219.51 291.1H71.58C32.05 291.1 0 259.05 0 219.51V71.58C0 32.05 32.05 0 71.58 0h147.93c39.53 0 71.58 32.05 71.58 71.58v147.93c.01 39.54-32.04 71.59-71.58 71.59z" />
      <g fill="#25f4ee">
        <path d="M120.96 123.89v-8.8a64.83 64.83 0 0 0-9.23-.79c-29.93-.06-56.42 19.33-65.41 47.87s1.62 59.62 26.18 76.71c-25.77-27.58-24.3-70.83 3.28-96.6a68.425 68.425 0 0 1 45.18-18.39z" />
        <path d="M122.62 223.53c16.73-.02 30.48-13.2 31.22-29.92V44.44h27.25a50.7 50.7 0 0 1-.79-9.44h-37.27v149.02c-.62 16.8-14.41 30.11-31.22 30.14-5.02-.04-9.97-1.28-14.42-3.6a31.276 31.276 0 0 0 25.23 12.97zM231.98 95.05v-8.29c-10.03 0-19.84-2.96-28.19-8.51a51.63 51.63 0 0 0 28.19 16.8z" />
      </g>
      <path
        d="M203.8 78.26a51.301 51.301 0 0 1-12.76-33.89h-9.95a51.564 51.564 0 0 0 22.71 33.89zM111.73 151.58c-17.28.09-31.22 14.17-31.13 31.45a31.293 31.293 0 0 0 16.71 27.53c-10.11-13.96-6.99-33.48 6.97-43.6a31.191 31.191 0 0 1 18.34-5.93c3.13.04 6.24.53 9.23 1.45v-37.93c-3.05-.46-6.14-.7-9.23-.72h-1.66v28.84c-3.01-.82-6.12-1.18-9.23-1.09z"
        fill="#fe2c55"
      />
      <path
        d="M231.98 95.05v28.84a88.442 88.442 0 0 1-51.69-16.8v75.77c-.08 37.81-30.75 68.42-68.56 68.42a67.816 67.816 0 0 1-39.22-12.4c25.73 27.67 69.02 29.25 96.7 3.52a68.397 68.397 0 0 0 21.83-50.09v-75.56a88.646 88.646 0 0 0 51.76 16.58V96.21c-3.64-.02-7.26-.4-10.82-1.16z"
        fill="#fe2c55"
      />
      <path
        d="M180.29 182.87V107.1a88.505 88.505 0 0 0 51.76 16.58V94.84a51.73 51.73 0 0 1-28.26-16.58 51.634 51.634 0 0 1-22.71-33.89h-27.25v149.24c-.71 17.27-15.27 30.69-32.54 29.99a31.278 31.278 0 0 1-24.06-12.9c-15.29-8.05-21.16-26.97-13.11-42.26a31.274 31.274 0 0 1 27.53-16.71c3.13.03 6.24.51 9.23 1.44V123.9c-37.74.64-67.82 32.19-67.18 69.93a68.353 68.353 0 0 0 18.73 45.86 67.834 67.834 0 0 0 39.29 11.61c37.82-.01 68.49-30.62 68.57-68.43z"
        fill="#fff"
      />
    </svg>
  ),
  Linkedin: ({ className, ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      viewBox="0 0 256 256"
      className={cn(className)}
      {...props}
    >
      <g fill="none">
        <rect width="256" height="256" fill="#fff" rx="60" />
        <rect width="256" height="256" fill="#0A66C2" rx="60" />
        <path
          fill="#fff"
          d="M184.715 217.685h29.27a4 4 0 0 0 4-3.999l.015-61.842c0-32.323-6.965-57.168-44.738-57.168c-14.359-.534-27.9 6.868-35.207 19.228a.32.32 0 0 1-.595-.161V101.66a4 4 0 0 0-4-4h-27.777a4 4 0 0 0-4 4v112.02a4 4 0 0 0 4 4h29.268a4 4 0 0 0 4-4v-55.373c0-15.657 2.97-30.82 22.381-30.82c19.135 0 19.383 17.916 19.383 31.834v54.364a4 4 0 0 0 4 4ZM38 59.627c0 11.865 9.767 21.627 21.632 21.627c11.862-.001 21.623-9.769 21.623-21.631C81.253 47.761 71.491 38 59.628 38C47.762 38 38 47.763 38 59.627Zm6.959 158.058h29.307a4 4 0 0 0 4-4V101.66a4 4 0 0 0-4-4H44.959a4 4 0 0 0-4 4v112.025a4 4 0 0 0 4 4Z"
        />
      </g>
    </svg>
  ),
  Twitter: ({ className, ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      viewBox="0 0 256 256"
      className={cn(className)}
      {...props}
    >
      <g fill="none">
        <rect width="256" height="256" fill="#fff" rx="60" />
        <rect width="256" height="256" fill="#1D9BF0" rx="60" />
        <path
          fill="#fff"
          d="M199.572 91.411c.11 1.587.11 3.174.11 4.776c0 48.797-37.148 105.075-105.075 105.075v-.03A104.54 104.54 0 0 1 38 184.677c2.918.351 5.85.526 8.79.533a74.154 74.154 0 0 0 45.864-15.839a36.976 36.976 0 0 1-34.5-25.645a36.811 36.811 0 0 0 16.672-.636c-17.228-3.481-29.623-18.618-29.623-36.198v-.468a36.705 36.705 0 0 0 16.76 4.622c-16.226-10.845-21.228-32.432-11.43-49.31a104.814 104.814 0 0 0 76.111 38.582a36.95 36.95 0 0 1 10.683-35.283c14.874-13.982 38.267-13.265 52.249 1.601a74.105 74.105 0 0 0 23.451-8.965a37.061 37.061 0 0 1-16.234 20.424A73.446 73.446 0 0 0 218 72.282a75.023 75.023 0 0 1-18.428 19.13Z"
        />
      </g>
    </svg>
  ),
  Instagram: ({ className, ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      viewBox="0 0 256 256"
      className={cn(className)}
      {...props}
    >
      <g fill="none">
        <rect
          width="256"
          height="256"
          fill="url(#skillIconsInstagram0)"
          rx="60"
        />
        <rect
          width="256"
          height="256"
          fill="url(#skillIconsInstagram1)"
          rx="60"
        />
        <path
          fill="#fff"
          d="M128.009 28c-27.158 0-30.567.119-41.233.604c-10.646.488-17.913 2.173-24.271 4.646c-6.578 2.554-12.157 5.971-17.715 11.531c-5.563 5.559-8.98 11.138-11.542 17.713c-2.48 6.36-4.167 13.63-4.646 24.271c-.477 10.667-.602 14.077-.602 41.236s.12 30.557.604 41.223c.49 10.646 2.175 17.913 4.646 24.271c2.556 6.578 5.973 12.157 11.533 17.715c5.557 5.563 11.136 8.988 17.709 11.542c6.363 2.473 13.631 4.158 24.275 4.646c10.667.485 14.073.604 41.23.604c27.161 0 30.559-.119 41.225-.604c10.646-.488 17.921-2.173 24.284-4.646c6.575-2.554 12.146-5.979 17.702-11.542c5.563-5.558 8.979-11.137 11.542-17.712c2.458-6.361 4.146-13.63 4.646-24.272c.479-10.666.604-14.066.604-41.225s-.125-30.567-.604-41.234c-.5-10.646-2.188-17.912-4.646-24.27c-2.563-6.578-5.979-12.157-11.542-17.716c-5.562-5.562-11.125-8.979-17.708-11.53c-6.375-2.474-13.646-4.16-24.292-4.647c-10.667-.485-14.063-.604-41.23-.604h.031Zm-8.971 18.021c2.663-.004 5.634 0 8.971 0c26.701 0 29.865.096 40.409.575c9.75.446 15.042 2.075 18.567 3.444c4.667 1.812 7.994 3.979 11.492 7.48c3.5 3.5 5.666 6.833 7.483 11.5c1.369 3.52 3 8.812 3.444 18.562c.479 10.542.583 13.708.583 40.396c0 26.688-.104 29.855-.583 40.396c-.446 9.75-2.075 15.042-3.444 18.563c-1.812 4.667-3.983 7.99-7.483 11.488c-3.5 3.5-6.823 5.666-11.492 7.479c-3.521 1.375-8.817 3-18.567 3.446c-10.542.479-13.708.583-40.409.583c-26.702 0-29.867-.104-40.408-.583c-9.75-.45-15.042-2.079-18.57-3.448c-4.666-1.813-8-3.979-11.5-7.479s-5.666-6.825-7.483-11.494c-1.369-3.521-3-8.813-3.444-18.563c-.479-10.542-.575-13.708-.575-40.413c0-26.704.096-29.854.575-40.396c.446-9.75 2.075-15.042 3.444-18.567c1.813-4.667 3.983-8 7.484-11.5c3.5-3.5 6.833-5.667 11.5-7.483c3.525-1.375 8.819-3 18.569-3.448c9.225-.417 12.8-.542 31.437-.563v.025Zm62.351 16.604c-6.625 0-12 5.37-12 11.996c0 6.625 5.375 12 12 12s12-5.375 12-12s-5.375-12-12-12v.004Zm-53.38 14.021c-28.36 0-51.354 22.994-51.354 51.355c0 28.361 22.994 51.344 51.354 51.344c28.361 0 51.347-22.983 51.347-51.344c0-28.36-22.988-51.355-51.349-51.355h.002Zm0 18.021c18.409 0 33.334 14.923 33.334 33.334c0 18.409-14.925 33.334-33.334 33.334c-18.41 0-33.333-14.925-33.333-33.334c0-18.411 14.923-33.334 33.333-33.334Z"
        />
        <defs>
          <radialGradient
            id="skillIconsInstagram0"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="matrix(0 -253.715 235.975 0 68 275.717)"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#FD5" />
            <stop offset=".1" stop-color="#FD5" />
            <stop offset=".5" stop-color="#FF543E" />
            <stop offset="1" stop-color="#C837AB" />
          </radialGradient>
          <radialGradient
            id="skillIconsInstagram1"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="matrix(22.25952 111.2061 -458.39518 91.75449 -42.881 18.441)"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#3771C8" />
            <stop offset=".128" stop-color="#3771C8" />
            <stop offset="1" stop-color="#60F" stop-opacity="0" />
          </radialGradient>
        </defs>
      </g>
    </svg>
  ),
}
