import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContent } from '../../context/AppContext';

const DailyChallenge = () => {
    const [asana, setAsana] = useState(null);
    const [loading, setLoading] = useState(true);
    const {backendUrl} = useContext(AppContent);
    useEffect(() => {
        const fetchData = async () => {
            try {
                
                const res = await axios.get(`${backendUrl}/daily/daily-task`);
                // Extract the returned asana object
                const d = res.data?.asana || {};

                // Safe fallbacks
                const name = d.name || 'Unknown Pose';
                const sanskritName = d.sanskritName || 'N/A';
                const category = d.category || 'General';
                const difficulty = d.difficulty || 'Medium';
                const duration = {
                    min: d.duration?.min || '30 seconds',
                    max: d.duration?.max || '1 minute',
                };
                const chakra = d.chakra || 'None';
                const bodyParts = d.bodyParts?.length ? d.bodyParts : ['Full Body'];
                const diseases = d.diseases?.length ? d.diseases : ['None'];
                const benefits = d.benefits?.length ? d.benefits : ['Enhances flexibility'];
                const steps = d.steps?.length ? d.steps : [{ title: 'Start Position', description: 'Stand comfortably.' }];
                const commonMistakes = d.commonMistakes?.length
                    ? d.commonMistakes
                    : [{ mistake: 'Holding breath', correction: 'Breathe steadily' }];
                const precautions = d.precautions?.length ? d.precautions : ['Consult doctor if needed.'];
                const modifications = d.modifications?.length ? d.modifications : ['Use a block under hands'];
                const props = d.props?.length ? d.props : ['Yoga mat'];
                const alignmentTips = d.alignmentTips?.length ? d.alignmentTips : ['Keep spine neutral'];
                const preparatoryPoses = d.preparatoryPoses?.length ? d.preparatoryPoses : ['Tadasana'];
                const followUpPoses = d.followUpPoses?.length ? d.followUpPoses : ['Child’s Pose'];
                const breathInstructions = d.breathInstructions || 'Inhale deeply, exhale slowly.';
                // Choose first non-empty video
                const video = (d.video || []).find((v) => v) || 'https://www.w3schools.com/html/mov_bbb.mp4';
                // Filter out empty images, take first two
                const images = (d.image || []).filter((i) => i).slice(0, 2);
                while (images.length < 2) images.push('https://via.placeholder.com/300');

                setAsana({
                    name,
                    sanskritName,
                    category,
                    difficulty,
                    duration,
                    chakra,
                    bodyParts,
                    diseases,
                    benefits,
                    steps,
                    commonMistakes,
                    precautions,
                    modifications,
                    props,
                    alignmentTips,
                    preparatoryPoses,
                    followUpPoses,
                    breathInstructions,
                    video,
                    images,
                });
            } catch (err) {
                console.error('Failed to load daily challenge:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="text-center p-4 text-lg">🌀 Loading Daily Challenge...</div>;
    if (!asana) return <div className="text-center p-4 text-red-600">❌ Failed to load pose.</div>;

    return (
        <div className="max-w-7xl mx-auto bg-green-70 p-4 space-y-6">

            {/* Media Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Video */}
                <video
                    controls
                    src={asana.video}
                    className="w-full h-100 rounded-xl shadow-md object-cover"
                />

                {/* Images */}
                {asana.images.map((img, idx) => (
                    <img
                        key={idx}
                        src={img}
                        alt="asana"
                        className="w-full h-100 rounded-xl shadow-md object-cover"
                    />
                ))}
            </div>


            {/* Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm md:text-base">
                <div>🧘‍♀️ <strong>Name:</strong> {asana.name} ({asana.sanskritName})</div>
                <div>📂 <strong>Category:</strong> {asana.category}<br />🎯 <strong>Difficulty:</strong> {asana.difficulty}</div>
                <div>⏱ <strong>Duration:</strong> {asana.duration.min} – {asana.duration.max}</div>
                <div>🔮 <strong>Chakra:</strong> {asana.chakra}</div>
                <div>💪 <strong>Body Parts:</strong> {asana.bodyParts.join(', ')}</div>
                <div>🩺 <strong>Diseases:</strong> {asana.diseases.join(', ')}</div>
            </div>

            {/* Benefits */}
            <div>
                <h2 className="text-xl font-semibold mb-2">🌟 Benefits</h2>
                <ul className="list-disc list-inside space-y-1">
                    {asana.benefits.map((b, i) => <li key={i}>✨ {b}</li>)}
                </ul>
            </div>

            {/* Steps */}
            <div>
                <h2 className="text-xl font-semibold mb-2">🧾 Steps</h2>
                <ol className="list-decimal list-inside space-y-2">
                    {asana.steps.map((step, i) => (
                        <li key={i}><strong>{step.title}:</strong> {step.description}</li>
                    ))}
                </ol>
            </div>

            {/* Common Mistakes */}
            <div>
                <h2 className="text-xl font-semibold mb-2">❌ Common Mistakes & ✅ Corrections</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {asana.commonMistakes.map((m, i) => (
                        <div key={i} className="bg-red-50 p-3 rounded-xl shadow">
                            <p>🚫 <strong>{m.mistake}</strong></p>
                            <p>✅ {m.correction}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Precautions */}
            {asana.precautions.length > 0 && (
                <div>
                    <h2 className="text-xl font-semibold mb-2">⚠️ Precautions</h2>
                    <ul className="list-disc list-inside">
                        {asana.precautions.map((p, i) => <li key={i}>⚠️ {p}</li>)}
                    </ul>
                </div>
            )}

            {/* Modifications / Props / Alignment Tips */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <h3 className="font-semibold mb-1">🧩 Modifications</h3>
                    <ul className="list-disc list-inside">
                        {asana.modifications.map((m, i) => <li key={i}>{m}</li>)}
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold mb-1">🪑 Props</h3>
                    <ul className="list-disc list-inside">
                        {asana.props.map((p, i) => <li key={i}>{p}</li>)}
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold mb-1">📌 Alignment Tips</h3>
                    <ul className="list-disc list-inside">
                        {asana.alignmentTips.map((a, i) => <li key={i}>{a}</li>)}
                    </ul>
                </div>
            </div>

            {/* Related Poses */}
            <div>
                <p>🔄 <strong>Preparatory:</strong> {asana.preparatoryPoses.join(', ')}</p>
                <p>➡️ <strong>Follow-up:</strong> {asana.followUpPoses.join(', ')}</p>
            </div>

            {/* Breath Instructions */}
            {asana.breathInstructions && (
                <div className="italic bg-blue-50 p-3 rounded-md">
                    🌬 <strong>Breath Instruction:</strong> {asana.breathInstructions}
                </div>
            )}
        </div>
    );
};

export default DailyChallenge;
