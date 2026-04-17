const handleVerify = () => {
    try {
      let raw = "";
      if (inputCode.includes('Ref Data:')) {
        raw = inputCode.split('Ref Data:')[1].trim();
      } else {
        raw = inputCode.trim();
      }

      if (!raw) return alert("කරුණාකර Code එක Paste කරන්න!");

      const decodedString = atob(raw);
      const json = JSON.parse(decodeURIComponent(escape(decodedString)));
      
      console.log("Parsed JSON:", json);

      // --- CRITICAL FIX START ---
      const formatted = {
        personalInfo: {
          name: json.personalInfo?.name || "",
          fullName: json.personalInfo?.fullName || "",
          description: json.personalInfo?.description || "",
          photo: json.personalInfo?.photo || json.profileImage || ""
        },
        contact: {
          email: json.contact?.email || "",
          phone1: json.contact?.phone || json.contact?.phone1 || "",
          address: json.contact?.address || ""
        },
        skills: Array.isArray(json.skills) ? json.skills : [],
        languages: Array.isArray(json.languages) ? json.languages : [],
        workExperience: Array.isArray(json.workExperience) ? json.workExperience : [],
        
        // මෙන්න මෙතන තමයි වැරදුණේ: Education එක Array එකක් විය යුතුයි
        education: Array.isArray(json.education) ? json.education : [], 
        
        professionalQualifications: Array.isArray(json.professionalQualifications) ? json.professionalQualifications : [],
        references: Array.isArray(json.references) ? json.references : [],
        selectedTemplate: Number(json.selectedTemplate) || 1,
        customColor: json.customColor || "#1e3a8a",
        brightness: json.brightness || 100
      };
      // --- CRITICAL FIX END ---

      setDecodedData(formatted);

    } catch (e) {
      console.error("Critical Decode Error:", e);
      alert("Invalid Code! Please copy the whole message.");
      setDecodedData(null);
    }
  };
