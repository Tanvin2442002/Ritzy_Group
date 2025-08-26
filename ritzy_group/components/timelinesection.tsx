import { Timeline } from "@/components/ui/timeline"
import Image from "next/image"

export default function TimelineDemo() {
  const data = [
    {
      title: "2005",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-300 md:text-sm">
            The beginning of our journey in Chittagong. Establishing our foundation and setting the groundwork for
            future growth.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/chittagong-city-establishment-2005.png"
              alt="Chittagong 2005"
              width={400}
              height={300}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <Image
              src="/early-business-chittagong.png"
              alt="Early development"
              width={400}
              height={300}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2008",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-300 md:text-sm">
            A pivotal year of expansion and growth. We strengthened our presence in the region and built lasting
            partnerships.
          </p>
          <p className="mb-8 text-xs font-normal text-neutral-300 md:text-sm">
            This period marked significant developments in our organizational structure and community engagement
            initiatives.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/chittagong-business-expansion-2008.png"
              alt="2008 expansion"
              width={400}
              height={300}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <Image
              src="/chittagong-community-partnerships.png"
              alt="Community partnerships"
              width={400}
              height={300}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2011",
      content: (
        <div>
          <p className="mb-4 text-xs font-normal text-neutral-300 md:text-sm">
            Milestone achievements and recognition in the Chittagong region
          </p>
          <div className="mb-8">
            <div className="flex items-center gap-2 text-xs text-neutral-400 md:text-sm">
              ✅ Regional leadership recognition
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-400 md:text-sm">
              ✅ Community development projects launched
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-400 md:text-sm">
              ✅ Strategic partnerships established
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-400 md:text-sm">
              ✅ Innovation initiatives implemented
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/chittagong-achievements-2011.png"
              alt="2011 achievements"
              width={400}
              height={300}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <Image
              src="/chittagong-innovation.png"
              alt="Innovation projects"
              width={400}
              height={300}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="relative w-full bg-black text-white min-h-screen overflow-visible">
      <Timeline data={data} />

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10 pb-20">
        {/* The managing director section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl mt-5 font-bold text-white mb-8 text-center">The managing director</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-8 shadow-lg">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-shrink-0">
                  <Image
                    src="https://www.ritzygroupbd.com/storage/pages/12-2020/message-from-md_header_image_1607163272.jpeg"
                    alt="Mirza Md. Jamshed Ali - Managing Director"
                    width={300}
                    height={300}
                    className="w-48 h-48 md:w-64 md:h-64 rounded-lg object-cover shadow-md"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl  md:text-2xl font-semibold text-neutral-200 mb-4">
                    Message from the Managing Director
                  </h3>
                  <div className="text-neutral-300 text-sm md:text-base leading-relaxed space-y-4">
                    <p>
                      Ritzy Group is more than just a company to me, it's a reflection of my vision, my passion, and the
                      years of dedication that have shaped who I am today. When I started this journey, I wasn't just
                      building a business; I was building a platform to create impact for people, for communities, and
                      for the future of Bangladesh.
                    </p>
                    <p>
                      The road hasn't always been easy. Like many entrepreneurs, I've faced challenges, setbacks, and
                      moments of uncertainty. But what kept me moving forward was a belief that with the right people,
                      clear purpose, and unwavering determination, we could build something meaningful and lasting.
                    </p>
                    <p>
                      This company represents more than production lines or export numbers. It's about the thousands of
                      individuals who come to work each day with purpose and commitment. It's about young professionals
                      finding their first opportunity, skilled workers supporting their families, and entire communities
                      empowered by the jobs we create.
                    </p>
                    <p className="font-medium text-neutral-200">
                      Warm regards,
                      <br />
                      <span className="font-semibold">Mirza Md. Jamshed Ali</span>
                      <br />
                      Managing Director, Ritzy Group
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our mission and vision section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">Our mission and vision</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-8 shadow-lg">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-shrink-0">
                  <Image
                    src="/mission-vision-values.png"
                    alt="Ritzy Group Mission and Vision"
                    width={300}
                    height={300}
                    className="w-48 h-48 md:w-64 md:h-64 rounded-lg object-cover shadow-md"
                  />
                </div>
                <div className="flex-1">
                  <div className="mb-6">
                    <h3 className="text-xl md:text-2xl font-semibold text-neutral-200 mb-3">Our Mission</h3>
                    <p className="text-neutral-300 text-sm md:text-base leading-relaxed">
                      At Ritzy Group, our mission is to improve the quality of life for the people of Bangladesh by
                      exporting world-class ready-made garments (RMG) and generating employment opportunities that
                      strengthen our communities. We are committed to driving sustainable growth through continuous
                      innovation, exceptional product quality, unwavering dedication, and outstanding customer service.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-neutral-200 mb-3">Our Vision</h3>
                    <p className="text-neutral-300 text-sm md:text-base leading-relaxed">
                      Ritzy Group envisions becoming a leading global conglomerate in the ready-made garment (RMG)
                      industry, known for delivering world-class products through a diverse and innovative portfolio.
                      Our goal is to be recognized as one of the most respected and desirable companies — both by our
                      customers and our employees — by upholding consistent quality, value for money, and a commitment
                      to excellence.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
