import React, { useState } from "react";
import styled from "styled-components";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { darkTheme } from "../theme";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json";

const MapContainer = styled.div`
  width: 100%;
  height: 600px;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 400px;
  }
`;

const DropdownContainer = styled.div`
  margin-bottom: ${darkTheme.spacing.xl}px;
  text-align: center;
`;

const DropdownLabel = styled.label`
  display: block;
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  font-weight: 500;
  color: rgba(248, 250, 252, 0.9);
  margin-bottom: ${darkTheme.spacing.sm}px;
`;

const Select = styled.select`
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(20px) saturate(120%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  font-family: "Inter", sans-serif;
  font-size: 0.95rem;
  padding: ${darkTheme.spacing.sm}px ${darkTheme.spacing.medium}px;
  min-width: 200px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: rgba(139, 92, 246, 0.5);
    background: rgba(255, 255, 255, 0.04);
  }

  &:hover {
    border-color: rgba(139, 92, 246, 0.3);
  }

  option {
    background: #1a1a1a;
    color: white;
  }
`;

const StyledComposableMap = styled(ComposableMap)`
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 20px rgba(139, 92, 246, 0.1));
`;

// Mock data for dream themes and locations - expanded dataset
const dreamData = [
  // Flying dreams
  {
    id: 1,
    topic: "Flying",
    lat: 40.7128,
    lon: -74.006,
    count: 245,
    city: "New York",
  },
  {
    id: 2,
    topic: "Flying",
    lat: 51.5074,
    lon: -0.1278,
    count: 189,
    city: "London",
  },
  {
    id: 3,
    topic: "Flying",
    lat: 35.6762,
    lon: 139.6503,
    count: 156,
    city: "Tokyo",
  },
  {
    id: 4,
    topic: "Flying",
    lat: -33.8688,
    lon: 151.2093,
    count: 98,
    city: "Sydney",
  },
  {
    id: 5,
    topic: "Flying",
    lat: 55.7558,
    lon: 37.6176,
    count: 134,
    city: "Moscow",
  },
  {
    id: 6,
    topic: "Flying",
    lat: 19.4326,
    lon: -99.1332,
    count: 87,
    city: "Mexico City",
  },
  {
    id: 50,
    topic: "Flying",
    lat: 37.5665,
    lon: 126.978,
    count: 145,
    city: "Seoul",
  },
  {
    id: 51,
    topic: "Flying",
    lat: 41.0082,
    lon: 28.9784,
    count: 112,
    city: "Istanbul",
  },
  {
    id: 52,
    topic: "Flying",
    lat: 59.3293,
    lon: 18.0686,
    count: 67,
    city: "Stockholm",
  },
  {
    id: 53,
    topic: "Flying",
    lat: 38.7223,
    lon: -9.1393,
    count: 89,
    city: "Lisbon",
  },
  {
    id: 54,
    topic: "Flying",
    lat: 6.5244,
    lon: 3.3792,
    count: 76,
    city: "Lagos",
  },
  {
    id: 55,
    topic: "Flying",
    lat: 22.3964,
    lon: 114.1095,
    count: 134,
    city: "Hong Kong",
  },

  // Water dreams
  {
    id: 7,
    topic: "Water",
    lat: 34.0522,
    lon: -118.2437,
    count: 203,
    city: "Los Angeles",
  },
  {
    id: 8,
    topic: "Water",
    lat: 48.8566,
    lon: 2.3522,
    count: 167,
    city: "Paris",
  },
  {
    id: 9,
    topic: "Water",
    lat: -22.9068,
    lon: -43.1729,
    count: 145,
    city: "Rio de Janeiro",
  },
  {
    id: 10,
    topic: "Water",
    lat: 1.3521,
    lon: 103.8198,
    count: 112,
    city: "Singapore",
  },
  {
    id: 11,
    topic: "Water",
    lat: 59.9311,
    lon: 10.7458,
    count: 89,
    city: "Oslo",
  },
  {
    id: 12,
    topic: "Water",
    lat: -37.8136,
    lon: 144.9631,
    count: 76,
    city: "Melbourne",
  },
  {
    id: 56,
    topic: "Water",
    lat: 36.2048,
    lon: 138.2529,
    count: 198,
    city: "Japan Alps",
  },
  {
    id: 57,
    topic: "Water",
    lat: 52.3676,
    lon: 4.9041,
    count: 134,
    city: "Amsterdam",
  },
  {
    id: 58,
    topic: "Water",
    lat: 64.2008,
    lon: -149.4937,
    count: 234,
    city: "Alaska",
  },
  {
    id: 59,
    topic: "Water",
    lat: -13.9634,
    lon: -171.855,
    count: 89,
    city: "Samoa",
  },
  {
    id: 60,
    topic: "Water",
    lat: 21.3099,
    lon: -157.8581,
    count: 167,
    city: "Honolulu",
  },
  {
    id: 61,
    topic: "Water",
    lat: 45.4215,
    lon: -123.8103,
    count: 145,
    city: "Oregon Coast",
  },

  // Cats dreams
  {
    id: 13,
    topic: "Cats",
    lat: 52.52,
    lon: 13.405,
    count: 178,
    city: "Berlin",
  },
  {
    id: 14,
    topic: "Cats",
    lat: 28.6139,
    lon: 77.209,
    count: 234,
    city: "New Delhi",
  },
  {
    id: 15,
    topic: "Cats",
    lat: 39.9042,
    lon: 116.4074,
    count: 198,
    city: "Beijing",
  },
  {
    id: 16,
    topic: "Cats",
    lat: -26.2041,
    lon: 28.0473,
    count: 156,
    city: "Johannesburg",
  },
  {
    id: 17,
    topic: "Cats",
    lat: 25.2048,
    lon: 55.2708,
    count: 123,
    city: "Dubai",
  },
  {
    id: 18,
    topic: "Cats",
    lat: 41.9028,
    lon: 12.4964,
    count: 94,
    city: "Rome",
  },
  {
    id: 62,
    topic: "Cats",
    lat: -1.2921,
    lon: 36.8219,
    count: 267,
    city: "Nairobi",
  },
  {
    id: 63,
    topic: "Cats",
    lat: -15.7942,
    lon: -47.8822,
    count: 189,
    city: "Brasília",
  },
  {
    id: 64,
    topic: "Cats",
    lat: 27.7172,
    lon: 85.324,
    count: 145,
    city: "Kathmandu",
  },
  {
    id: 65,
    topic: "Cats",
    lat: -3.3704,
    lon: -168.0144,
    count: 234,
    city: "Amazon",
  },
  {
    id: 66,
    topic: "Cats",
    lat: 48.1351,
    lon: 11.582,
    count: 112,
    city: "Munich",
  },
  {
    id: 67,
    topic: "Cats",
    lat: 35.6804,
    lon: 51.4124,
    count: 98,
    city: "Tehran",
  },

  // Social Media dreams
  {
    id: 19,
    topic: "Social Media",
    lat: 37.7749,
    lon: -122.4194,
    count: 267,
    city: "San Francisco",
  },
  {
    id: 20,
    topic: "Social Media",
    lat: 45.4215,
    lon: -75.6972,
    count: 145,
    city: "Ottawa",
  },
  {
    id: 21,
    topic: "Social Media",
    lat: 50.0755,
    lon: 14.4378,
    count: 167,
    city: "Prague",
  },
  {
    id: 22,
    topic: "Social Media",
    lat: -34.6037,
    lon: -58.3816,
    count: 134,
    city: "Buenos Aires",
  },
  {
    id: 23,
    topic: "Social Media",
    lat: 31.2304,
    lon: 121.4737,
    count: 189,
    city: "Shanghai",
  },
  {
    id: 24,
    topic: "Social Media",
    lat: 60.1699,
    lon: 24.9384,
    count: 78,
    city: "Helsinki",
  },
  {
    id: 68,
    topic: "Social Media",
    lat: 46.2044,
    lon: 6.1432,
    count: 234,
    city: "Geneva",
  },
  {
    id: 69,
    topic: "Social Media",
    lat: 19.076,
    lon: 72.8777,
    count: 298,
    city: "Mumbai",
  },
  {
    id: 70,
    topic: "Social Media",
    lat: 23.1291,
    lon: 113.2644,
    count: 187,
    city: "Guangzhou",
  },
  {
    id: 71,
    topic: "Social Media",
    lat: 14.5995,
    lon: 120.9842,
    count: 165,
    city: "Manila",
  },
  {
    id: 72,
    topic: "Social Media",
    lat: 30.0444,
    lon: 31.2357,
    count: 143,
    city: "Cairo",
  },
  {
    id: 73,
    topic: "Social Media",
    lat: 40.4168,
    lon: -3.7038,
    count: 121,
    city: "Madrid",
  },
];

const topics = ["Cats", "Flying", "Water", "Social Media"];

interface DreamMapProps {}

const DreamMap: React.FC<DreamMapProps> = () => {
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const filteredData = dreamData.filter((d) => d.topic === selectedTopic);

  return (
    <>
      <MapContainer>
        <StyledComposableMap
          projectionConfig={{
            scale: 260,
            center: [0, 15],
            rotate: [0, 0, 0],
          }}
          style={{ width: "100%", height: "100%" }}
          height={400}
          width={1400}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={darkTheme.colors.secondary.main} // Fill with secondary color (teal)
                  stroke="none" // No outline
                  strokeWidth={0}
                  style={{
                    default: {
                      outline: "none",
                      fillOpacity: 0.65, // Subtle fill
                    },
                    hover: {
                      outline: "none",
                      fillOpacity: 0.85, // Slightly more visible on hover
                    },
                    pressed: {
                      outline: "none",
                    },
                  }}
                />
              ))
            }
          </Geographies>

          {filteredData.map((point) => {
            // Scale dots based on count (min radius 3, max radius 12)
            const radius = Math.max(
              3,
              Math.min(12, Math.sqrt(point.count) * 0.8)
            );
            const opacity = Math.max(0.4, Math.min(1, point.count / 300));

            return (
              <Marker key={point.id} coordinates={[point.lon, point.lat]}>
                <g>
                  {/* Outer glow effect */}
                  <circle
                    r={radius + 4}
                    fill={darkTheme.colors.primary.main}
                    fillOpacity={opacity * 0.2}
                    style={{
                      filter: "blur(4px)",
                    }}
                  />
                  {/* Middle glow */}
                  <circle
                    r={radius + 2}
                    fill={darkTheme.colors.primary.light}
                    fillOpacity={opacity * 0.4}
                    style={{
                      filter: "blur(2px)",
                    }}
                  />
                  {/* Core dot */}
                  <circle
                    r={radius}
                    fill={darkTheme.colors.primary.main}
                    fillOpacity={opacity}
                    style={{
                      filter: "blur(0.5px)",
                    }}
                  />
                  {/* Inner highlight */}
                  <circle r={radius * 0.4} fill="white" fillOpacity={0.6} />
                </g>
              </Marker>
            );
          })}
        </StyledComposableMap>
      </MapContainer>
      <DropdownContainer>
        <DropdownLabel htmlFor="dream-topic">
          See where last night people dreamed about:
        </DropdownLabel>
        <Select
          id="dream-topic"
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
        >
          {topics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </Select>
      </DropdownContainer>
    </>
  );
};

export default DreamMap;
