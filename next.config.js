/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "s.namemc.com",
				port: "",
				pathname: "/2d/skin/face.png",
			},
		],
	},
};

module.exports = nextConfig;
