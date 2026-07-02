---
title: "CardiacEPX: An Immersive XR Simulator for Cardiac Catheter Ablation Training"
summary: "An immersive VR simulator that pairs real patient electrophysiological data with a physical, sensor-instrumented catheter to bring hands-on ablation skills practice earlier in the electrophysiology training pathway, designed and validated with practising electrophysiologists."
role: "PhD Research"
tags: ["Unity", "C#", "VR", "XR", "HCI", "Medical Simulation", "User-Centred Design", "Arduino", "Human Factors", "Healthcare"]
date: 2025-06-01
context: "PhD research programme, Victoria University of Wellington (thesis completed 2025)"
supervisors: ["Dr Craig Anslow", "Dr Brian Robinson"]
featured: true
cover: "/images/projects/cardiacepx/vr-interface.jpg"
gallery:
  - src: "/images/projects/cardiacepx/hardware-and-mapping.jpg"
    alt: "Physical catheter hardware setup (left) with real-time IMU sensor tracking, alongside the electroanatomical map visualization it drives (right)"
videoUrl: "https://www.youtube.com/watch?v=awkvkrlxrQw&list=PLLnOKxdNgo8O7lEoOXsxblqtX4wz6mVAg&index=7"
problem:
  - "Fellows learn theory from reading/workshops, but the only route to hands-on skill is supervised training on live patients"
  - "Clinical time is limited: strict time pressure, patient-safety priorities, few chances to practise independently"
  - "Foundational skills like vascular access and catheter handling can take months to develop"
  - "CardiacEPX moves skills practice earlier, giving fellows a safe, repeatable way to build procedural skill before and during clinical training"
methods:
  - "Semi-structured interviews with 7 NZ electrophysiologists; thematic analysis for requirements"
  - "Iterative User-Centred Design across 4 phases, 3 development stages"
  - "Custom hardware: Arduino/MPU6050 IMU-instrumented physical catheter for real-time motion tracking"
  - "Built in Unity/C# for Meta Quest Pro"
  - "Real patient case studies via CARTO3 electroanatomical mapping"
  - "3 expert evaluation studies, incl. a within-subjects VR-controller vs. physical-catheter comparison"
outcome:
  - "Validated with 12 New Zealand electrophysiologists and fellows across the research programme"
  - "Rated usable and well-received by expert users"
  - "Points to a fidelity-graded training model: VR controllers for knowledge/decision-making, physical catheter for hands-on navigation skill"
  - "Full results in preparation for publication"
---

## Overview

CardiacEPX targets a specific gap in cardiac electrophysiology training. Fellows acquire theoretical knowledge through reading and hands-on workshops, but the only place they can build actual procedural skills is supervised clinical training on real patients. That clinical window is narrow. Ablation procedures run under time pressure, supervisors must protect patient safety and often step in to keep cases on schedule, and fellows are given limited autonomy, especially early on. Foundational skills like vascular access and catheter manipulation can therefore take months to reach proficiency. CardiacEPX is designed to shift skills practice earlier in the pathway, giving fellows a safe, repeatable environment to develop these skills before and alongside their clinical training rather than solely during live cases.

The system is a VR application for the Meta Quest Pro that recreates an electrophysiology laboratory and visualises real electroanatomical data exported from the CARTO3 system used in New Zealand EP labs. Fellows can examine and manipulate 3D electroanatomical maps (unipolar/bipolar voltage, LAT), review ECG signals alongside catheter positions on a timeline, diagnose arrhythmias, mark ablation targets, and compare their strategy against the clinically performed ablation. Two interaction modalities are supported: standard VR controllers, and a custom physical catheter fitted with Arduino-based IMU sensors that translate real torque, bend, and linear hand movements into catheter navigation and foot-pedal-triggered ablation.

## Process

The work followed a complete User-Centred Design arc. It opened with clinical-advisor consultation and a literature review, then semi-structured interviews with seven electrophysiologists and thematic analysis to surface procedural and training challenges: limited hands-on time, reduced fellow autonomy, and the gap between conceptual knowledge and practical skill. These were translated into system requirements.

Development ran in three stages mirrored in the system architecture: 3D electroanatomical map visualisation and manipulation; integration of ECG/rhythm data with catheter-position playback; and physical catheter integration, where IMU sensor readings drive a virtual catheter whose tip changes colour on wall contact and produces an ablation lesion when the foot pedal is triggered. Alternative sensing approaches such as StretchSense gloves, OptiTrack, and magnetic tracking were evaluated and deliberately rejected in favour of the Arduino IMU design for cost, portability, and fidelity, and documented as explicit design rationale.

Evaluation spanned three studies: an initial usability study, a second-iteration study assessing electroanatomical data interaction, and a final within-subjects comparison in which electrophysiologists and a fellow performed the same ablation task using both VR controllers and the physical catheter, with usability, workload, simulator sickness, and task performance captured per condition.

## Outcome / Impact

Early evaluation with expert users is encouraging. The system was received as usable and relevant across iterations, and its perceived value grew as fidelity increased. The central emerging finding is a fidelity-graded, modality-matched training model, where the two interaction methods appear complementary rather than competing. Lighter VR-controller interaction suits knowledge acquisition and decision-making practice (better suited to earlier-stage fellows), while the physical catheter supports catheter navigation and psychomotor skills training and drew interest even from experienced electrophysiologists, including as a way to trial new catheter designs. This framing positions CardiacEPX as a way to bring skills training forward in the electrophysiology pathway, and anchors both the ongoing publication and the university invention disclosure. Full results are being prepared for publication.
