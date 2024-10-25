"use client"

import React, { useState } from 'react';
import { Calendar, Clock, Linkedin, CalendarCheck2, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const LinkedInScheduler = () => {
	const [postContent, setPostContent] = useState('');
	const [scheduleDate, setScheduleDate] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);

	// const handleSchedulePost = async () => {
	// 	setIsLoading(true);
	// 	// Simulate API call
	// 	await new Promise(resolve => setTimeout(resolve, 1500));
	// 	setShowSuccessMessage(true);
	// 	setIsLoading(false);
	// 	setTimeout(() => setShowSuccessMessage(false), 3000);
	// };

	return (
		<div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
			<div className="max-w-4xl mx-auto">
				{/* Header Section */}
				<div className="flex items-center justify-between mb-8">
					<h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent animate-gradient">
						LinkedIn Post Scheduler
					</h1>
				</div>

				<Card className="bg-gray-800 border-gray-700">
					<CardHeader>
						<CardTitle className="text-xl text-gray-100">Create Post</CardTitle>
					</CardHeader>
					<CardContent>
						{/* Post Content Section */}
						<div className="space-y-6">
							<div className="relative">
								<textarea
									value={postContent}
									onChange={(e) => setPostContent(e.target.value)}
									placeholder="What would you like to share?"
									className="w-full h-40 p-4 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-100 placeholder-gray-400 transition-all duration-300"
									maxLength={3000}
								/>
								<span className="absolute bottom-2 right-2 text-sm text-gray-400">
									{postContent.length}/3000
								</span>
							</div>

							{/* Schedule Section */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="relative">
									<label className="block text-sm font-medium text-gray-300 mb-2">
										Schedule Date
									</label>
									<div className="relative">
										<Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
										<input
											type="date"
											value={scheduleDate}
											onChange={(e) => setScheduleDate(e.target.value)}
											className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100"
										/>
									</div>
								</div>

								<div className="relative">
									<label className="block text-sm font-medium text-gray-300 mb-2">
										Schedule Time
									</label>
									<div className="relative">
										<Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
										<input
											type="time"
											className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100"
										/>
									</div>
								</div>
							</div>

							{/* Action Buttons */}
							<div className="flex justify-end gap-4">
								<button
									onClick={() => {
										setPostContent('');
										setScheduleDate('');
									}}
									className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-300"
								>
									<X className="w-4 h-4" />
									Clear
								</button>
								<button
									disabled={isLoading || !postContent}
									className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105
                    ${isLoading ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'}`}
								>
									<CalendarCheck2 className="w-4 h-4" />
									{isLoading ? 'Scheduling...' : 'Schedule Post'}
								</button>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Success Message */}
				{showSuccessMessage && (
					<div className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-slide-up">
						Post scheduled successfully!
					</div>
				)}
			</div>
		</div>
	);
};

export default LinkedInScheduler;
